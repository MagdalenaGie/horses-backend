SET SEARCH_PATH to stadnina;
CREATE VIEW uczestnicy_zajec AS
    SELECT
           (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_im,
           (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_nzw,
           (SELECT k.imie from stadnina.kon k WHERE k.id_kon=p.id_kon) AS k_im ,
           id_wlasciciel,
           id_kon,
           id_lekcja
    from stadnina.lekcja_para p;
-- SELECT * FROM uczestnicy_zajec where id_lekcja = 3;

CREATE VIEW kon_info AS SELECT
       k.imie,
       k.rasa,
       k.id_kon,
       k.data_ur,
       (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie,
       (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel),
       (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel)
FROM stadnina.kon k;

-- SELECT * FROM kon_info WHERE id_kon = 3;

CREATE VIEW kon_kontuzja_info AS
    SELECT
        (SELECT k.opis FROM stadnina.kontuzja k WHERE k.id_kontuzja = kk.id_kontuzja) AS opis_urazu,
        (SELECT w.imie FROM stadnina.weterynarz w WHERE w.id_weterynarz = kk.id_weterynarz) AS w_imie,
        (SELECT w.nazwisko FROM stadnina.weterynarz w WHERE w.id_weterynarz = kk.id_weterynarz) AS w_nazw,
        kk.data_urazu,
        kk.id_kontuzja,
        kk.id_kon
    FROM stadnina.kon_kontuzja kk;

-- SELECT * FROM kon_kontuzja_info WHERE id_kon = 9;


CREATE VIEW lekcja_info AS
    SELECT * ,
        (SELECT i.imie FROM stadnina.instruktor i WHERE i.id_instruktor=j.id_instruktor) AS ins_imie,
        (SELECT i.nazwisko FROM stadnina.instruktor i WHERE i.id_instruktor=j.id_instruktor) AS ins_nazw
    FROM stadnina.lekcja_jazdy j;

-- SELECT * FROM lekcja_info WHERE id_lekcja = 3;

CREATE VIEW konie_wlasciciela_info AS
    SELECT
           k.imie,
           k.rasa,
           k.id_kon,
           k.data_ur,
           k.id_wlasciciel,
           (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie,
           (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_nazw,
           (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel)
    FROM stadnina.kon k;

-- SELECT * FROM konie_wlasciciela_info WHERE id_wlasciciel = 3;

CREATE VIEW lekcje_konia_info AS
    SELECT
        dzien,
        godzina,
        opis,
        imie,
        nazwisko,
        lp.id_lekcja,
        lp.id_kon,
        cena
    FROM stadnina.lekcja_para lp JOIN stadnina.lekcja_jazdy lj ON lp.id_lekcja = lj.id_lekcja JOIN stadnina.instruktor i ON lj.id_instruktor = i.id_instruktor;

-- SELECT * FROM lekcje_konia_info WHERE id_kon = 3;

CREATE VIEW stajnia_info AS
    SELECT
        id_stajnia,
        id_stadnina,
        opis,
        ilosc_boksow,
        w.id_stajenny,
        imie,
        nazwisko
    FROM stadnina.stajnia s JOIN stadnina.stajenny w on w.id_stajenny=s.id_stajenny;