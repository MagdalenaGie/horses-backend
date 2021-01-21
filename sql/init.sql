CREATE SCHEMA stadnina;
CREATE TABLE stadnina.kontuzja (
                id_kontuzja SERIAL NOT NULL,
                opis VARCHAR NOT NULL,
                CONSTRAINT kontuzja_pk PRIMARY KEY (id_kontuzja)
);


CREATE TABLE stadnina.Weterynarz (
                id_weterynarz SERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                cena_wizyty INTEGER NOT NULL,
                telefon VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                CONSTRAINT weterynarz_pk PRIMARY KEY (id_weterynarz)
);


CREATE TABLE stadnina.Kowal (
                id_kowal SERIAL NOT NULL,
                nazwisko VARCHAR NOT NULL,
                imie VARCHAR NOT NULL,
                cena_uslugi INTEGER NOT NULL,
                co_ile_tygodni INTEGER NOT NULL,
                CONSTRAINT kowal_pk PRIMARY KEY (id_kowal)
);


CREATE TABLE stadnina.Instruktor (
                id_instruktor SERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                CONSTRAINT instruktor_pk PRIMARY KEY (id_instruktor)
);


CREATE TABLE stadnina.Lekcja_jazdy (
                id_lekcja SERIAL NOT NULL,
                id_instruktor INTEGER NOT NULL,
                dzien VARCHAR NOT NULL,
                cena INTEGER NOT NULL,
                godzina TIME NOT NULL,
                opis VARCHAR NOT NULL,
                CONSTRAINT lekcja_jazdy_pk PRIMARY KEY (id_lekcja)
);


CREATE TABLE stadnina.Stajenny (
                id_stajenny SERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                CONSTRAINT stajenny_pk PRIMARY KEY (id_stajenny)
);


CREATE TABLE stadnina.Wlasciciel (
                id_wlasciciel SERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                telefon VARCHAR NOT NULL,
                username VARCHAR NOT NULL,
                pass VARCHAR NOT NULL,
                CONSTRAINT wlasciciel_pk PRIMARY KEY (id_wlasciciel)
);


CREATE TABLE stadnina.Stadnina_koni (
                id_stadnina SERIAL NOT NULL,
                nazwa VARCHAR NOT NULL,
                lokalizacja VARCHAR NOT NULL,
                CONSTRAINT stadnina_koni_pk PRIMARY KEY (id_stadnina)
);


CREATE TABLE stadnina.Stajnia (
                id_stajnia SERIAL NOT NULL,
                id_stadnina INTEGER NOT NULL,
                opis VARCHAR,
                ilosc_boksow INTEGER NOT NULL,
                id_stajenny INTEGER NOT NULL,
                CONSTRAINT stajnia_pk PRIMARY KEY (id_stajnia)
);


CREATE TABLE stadnina.Kon (
                id_kon SERIAL NOT NULL,
                id_stajnia INTEGER NOT NULL,
                id_wlasciciel INTEGER NOT NULL,
                imie VARCHAR NOT NULL,
                rasa VARCHAR NOT NULL,
                data_ur DATE NOT NULL,
                id_kowal INTEGER NOT NULL,
                CONSTRAINT kon_pk PRIMARY KEY (id_kon)
);


CREATE TABLE stadnina.kon_kontuzja (
                id_kon INTEGER NOT NULL,
                id_weterynarz INTEGER NOT NULL,
                id_kontuzja INTEGER NOT NULL,
                data_urazu DATE NOT NULL,
                CONSTRAINT kon_kontuzja_pk PRIMARY KEY (id_kon, id_weterynarz, id_kontuzja)
);


CREATE TABLE stadnina.Lekcja_para (
                id_wlasciciel INTEGER NOT NULL,
                id_kon INTEGER NOT NULL,
                id_lekcja INTEGER NOT NULL,
                CONSTRAINT lekcja_para_pk PRIMARY KEY (id_wlasciciel, id_kon, id_lekcja)
);


ALTER TABLE stadnina.kon_kontuzja ADD CONSTRAINT kontuzja_kon_kontuzja_fk
FOREIGN KEY (id_kontuzja)
REFERENCES stadnina.kontuzja (id_kontuzja)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.kon_kontuzja ADD CONSTRAINT weterynarz_kon_kontuzja_fk
FOREIGN KEY (id_weterynarz)
REFERENCES stadnina.Weterynarz (id_weterynarz)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Kon ADD CONSTRAINT kowal_kon_fk
FOREIGN KEY (id_kowal)
REFERENCES stadnina.Kowal (id_kowal)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Lekcja_para ADD CONSTRAINT wlasciciel_lekcja_para_fk
FOREIGN KEY (id_wlasciciel)
REFERENCES stadnina.wlasciciel (id_wlasciciel)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Lekcja_jazdy ADD CONSTRAINT instruktor_lekcja_jazdy_fk
FOREIGN KEY (id_instruktor)
REFERENCES stadnina.Instruktor (id_instruktor)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Lekcja_para ADD CONSTRAINT lekcja_jazdy_lekcja_para_fk
FOREIGN KEY (id_lekcja)
REFERENCES stadnina.Lekcja_jazdy (id_lekcja)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Stajnia ADD CONSTRAINT stajenny_stajnia_fk
FOREIGN KEY (id_stajenny)
REFERENCES stadnina.Stajenny (id_stajenny)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Kon ADD CONSTRAINT wlasciciel_kon_fk
FOREIGN KEY (id_wlasciciel)
REFERENCES stadnina.Wlasciciel (id_wlasciciel)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Stajnia ADD CONSTRAINT stadnina_koni_stajnia_fk
FOREIGN KEY (id_stadnina)
REFERENCES stadnina.Stadnina_koni (id_stadnina)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Kon ADD CONSTRAINT stajnia_kon_fk
FOREIGN KEY (id_stajnia)
REFERENCES stadnina.Stajnia (id_stajnia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.Lekcja_para ADD CONSTRAINT kon_lekcja_para_fk
FOREIGN KEY (id_kon)
REFERENCES stadnina.Kon (id_kon)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE stadnina.kon_kontuzja ADD CONSTRAINT kon_kon_kontuzja_fk
FOREIGN KEY (id_kon)
REFERENCES stadnina.Kon (id_kon)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;