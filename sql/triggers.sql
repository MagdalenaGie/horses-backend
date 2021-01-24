SET SEARCH_PATH TO stadnina;
-- DODAWANIE KONI --
CREATE OR REPLACE FUNCTION sprawdz_miejsce_w_stajni() RETURNS TRIGGER AS '
DECLARE
    suma integer;
    max integer;
BEGIN
    max = (SELECT s.ilosc_boksow FROM stadnina.stajnia s WHERE s.id_stajnia = NEW.id_stajnia);
    suma = (SELECT count(*) FROM stadnina.kon k WHERE k.id_stajnia = NEW.id_stajnia);
    IF suma < max THEN
        RAISE NOTICE ''Ok, miesci sie w limicie'';
        RETURN NEW;
    ELSE
        RAISE NOTICE ''Niestety, kon nie miesci sie w limicie - wybierz inna stajnie'';
        RETURN NULL;
    END IF;
end;
'LANGUAGE 'plpgsql';

CREATE TRIGGER zakwateruj_konia BEFORE INSERT OR UPDATE ON stadnina.kon FOR EACH ROW EXECUTE PROCEDURE sprawdz_miejsce_w_stajni();

-- DODAWANIE LEKCJI --

CREATE OR REPLACE FUNCTION sprawdz_termin_zajec() RETURNS TRIGGER AS '
DECLARE
    lekcja record;
BEGIN
    FOR lekcja IN (SELECT l.dzien, l.godzina FROM stadnina.lekcja_jazdy l WHERE l.dzien = NEW.dzien)
    LOOP
        IF lekcja.godzina = NEW.godzina THEN
            RAISE NOTICE ''Jest juz lekcja w tym terminie'';
            RETURN NULL;
        END IF;
    END LOOP;
    RETURN NEW;
end;
'LANGUAGE 'plpgsql';

CREATE TRIGGER dodaj_zajecia BEFORE INSERT OR UPDATE ON stadnina.lekcja_jazdy FOR EACH ROW EXECUTE PROCEDURE sprawdz_termin_zajec();

--INSERT INTO lekcja_jazdy(id_instruktor, dzien, cena, godzina, opis) VALUES (1, 'Pn', 30, '17:00:00', 'poczatkujacy');

-- DODAWANIE UCZESTNIKOW ZAJEC --
CREATE OR REPLACE FUNCTION sprawdz_mozliwosc_zapisu() RETURNS TRIGGER AS '
DECLARE
    para record;
BEGIN
    FOR para IN (SELECT p.id_wlasciciel, p.id_kon, p.id_lekcja FROM stadnina.lekcja_para p WHERE p.id_lekcja = NEW.id_lekcja)
    LOOP
        IF para.id_wlasciciel = NEW.id_wlasciciel THEN
            RAISE NOTICE ''Ten jezdziec jest juz zapisany na te zajecia!'';
            RETURN NULL;
        ELSIF para.id_kon = NEW.id_kon THEN
            RAISE NOTICE ''Ten kon jest juz zapisany na te zajecia z innym jezdzcem!'';
            RETURN NULL;
        END IF;
    END LOOP;
    IF (SELECT COUNT(*) FROM stadnina.kon_kontuzja k WHERE k.id_kon = NEW.id_kon) > 0 THEN
        RAISE NOTICE ''Ten kon jest kontuzjowany - nie mozna go zapisac na zajecia!'';
        RETURN NULL;
    END IF;

    RETURN NEW;
end;
' LANGUAGE 'plpgsql';

CREATE TRIGGER dodaj_pare BEFORE INSERT OR UPDATE ON stadnina.lekcja_para FOR EACH ROW EXECUTE PROCEDURE sprawdz_mozliwosc_zapisu();

--INSERT INTO lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES (5, 9, 4);

-- DODAWANIE DO ZAJEC V2 -> LIMITY --
CREATE OR REPLACE FUNCTION sprawdz_limit_zapisu() RETURNS TRIGGER AS '
DECLARE
    para record;
BEGIN
    IF (SELECT l.opis FROM stadnina.lekcja_jazdy l WHERE l.id_lekcja = NEW.id_lekcja) = ''trening indywidualny'' THEN
        RAISE NOTICE ''To trening indywidualny - nie moze sie zapsac wiecej niz 1 osoba'';
        RETURN NULL;
    ELSIF (SELECT COUNT(*) FROM stadnina.lekcja_para WHERE id_lekcja = NEW.id_lekcja) > 4 THEN
        RAISE NOTICE ''Na ten trening jest juz zapisane 5 osob, limiit uczestnikow zostal osiagniety'';
        RETURN NULL;
    END IF;
    RETURN NEW;
end;
' LANGUAGE 'plpgsql';

CREATE TRIGGER dodaj_pare_sprawdz_limity BEFORE INSERT OR UPDATE ON stadnina.lekcja_para FOR EACH ROW EXECUTE PROCEDURE sprawdz_limit_zapisu();

--INSERT INTO lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES (5, 11, 17);

-- ZGLOSZENIE KONTUZJI --
CREATE OR REPLACE FUNCTION kontuzja_zgloszona() RETURNS TRIGGER AS '
BEGIN
    DELETE FROM stadnina.lekcja_para lp WHERE lp.id_kon = NEW.id_kon;
    RETURN NEW;
end;
' LANGUAGE 'plpgsql';

CREATE TRIGGER wyslij_konia_na_l4 BEFORE INSERT OR UPDATE ON stadnina.kon_kontuzja FOR EACH ROW EXECUTE PROCEDURE kontuzja_zgloszona();

--INSERT INTO kon_kontuzja(id_kon, id_weterynarz, id_kontuzja, data_urazu) VALUES (1, 1, 1, '2021-01-02');

-- INSERT INTO Lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES
-- (1, 1, 4),
-- (1, 1, 9),
-- (1, 1, 14);

-- DELETE HORSE --
SET SEARCH_PATH TO stadnina;
create function wykwateruj_konia() returns trigger
    language plpgsql
as
    $$
    BEGIN
        DELETE FROM stadnina.kon_kontuzja WHERE stadnina.kon_kontuzja.id_kon = OLD.id_kon;
        DELETE FROM stadnina.lekcja_para WHERE stadnina.lekcja_para.id_kon = OLD.id_kon;
        RETURN OLD;
    END;
$$;

create TRIGGER usun_konia BEFORE DELETE ON stadnina.kon FOR EACH ROW EXECUTE PROCEDURE wykwateruj_konia();
--DELETE FROM kon where kon.imie='Dzazira';

--DELETE LESSON--
create function usun_uczestnikow() returns trigger
    language plpgsql
as
$$
BEGIN
        DELETE FROM stadnina.lekcja_para WHERE stadnina.lekcja_para.id_lekcja = OLD.id_lekcja;
        RETURN OLD;
    END;
$$;

create TRIGGER usun_lekcje BEFORE DELETE ON stadnina.lekcja_jazdy FOR EACH ROW EXECUTE PROCEDURE usun_uczestnikow();