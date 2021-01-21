INSERT INTO Stadnina_koni(nazwa, lokalizacja) VALUES
('OJ Kasztanka', 'Parkoszowice');

INSERT INTO Stajenny(imie, nazwisko) VALUES
('Janusz', 'Ochocki'),
('Kamil', 'Nowakowski'),
('Karolina', 'Jackowska'),
('Krzysztof', 'Kwiecien');

INSERT INTO Stajnia(id_stadnina, opis, ilosc_boksow, id_stajenny) VALUES
(1, 'stajnia glowna', 20, 4),
(1, 'stajnia zewnetrzna nr.1', 7, 2),
(1, 'stajnia zewnetrzna nr.2', 7, 1);

INSERT INTO Kowal(nazwisko, imie, cena_uslugi, co_ile_tygodni) VALUES
('Malinowski', 'Adam', 150, 6),
('Jankowski', 'Michal', 100, 4);

INSERT INTO Kontuzja(opis) VALUES
('Podbicie'),
('Naderwane sciegno'),
('Zerwane sciegno'),
('Zlamanie');

INSERT INTO Weterynarz(imie, nazwisko, cena_wizyty, telefon) VALUES
('Ilona', 'Rynkowska', 200, '237933673'),
('Stanislaw', 'Wyrobek', 150, '337824997');

INSERT INTO Wlasciciel( imie, nazwisko, telefon, username, pass) VALUES
('Karolina', 'Walek', '237499338', 'kwalek', 'kwalekpass'),
('Katarzyna', 'Sikora', '448934867', 'ksikora', 'ksikorapass'),
('Magdalena', 'Czaban', '448287472', 'mczaban', 'mczabanpass'),
('Alicja', 'Tracz', '478299484', 'atracz', 'atraczpass'),
('Kamila', 'Nowakowska', '8837774621', 'knowak', 'knowakpass'),
('Janina', 'Stefanczyk', '635774489', 'jstef', 'jstefpass'),
('Aleksandra', 'Duda', '324973378', 'aduda', 'adudapass'),
('Tomasz', 'Kaminski', '662783389', 'tkam', 'tkampass'),
('Kamil', 'Tracz', '738892237', 'ktracz', 'ktraczpass'),
('Stefan', 'Cichocki', '883726736', 'scich', 'scichpass'),
('Krzysztof', 'Kwiecien', '209876299', 'admin', 'adminpass');

INSERT INTO Instruktor(imie, nazwisko) VALUES
('Marta', 'Kwiecien'),
('Agata', 'Chromik'),
('Krzysztof', 'Kwiecien');

INSERT INTO Kon (id_wlasciciel, id_stajnia, imie, rasa, data_ur, id_kowal) VALUES
(1, 1,  'Pensylwania', 'mlp', '2007-03-21', 1),
(1, 1, 'Koral', 'mlp', '2010-07-02', 1),
(2, 1, 'Granda', 'sp', '2008-11-03', 1),
(3, 1, 'Nawarro', 'sp', '2009-09-20', 1),
(3, 1, 'Akir', 'sp', '2004-01-22', 1),
(4, 1, 'Barbie', 'sp', '2011-08-07', 1),
(4, 1, 'Seniorina', 'mlp', '2006-02-17', 1),
(5, 1, 'Agat', 'han', '2008-09-12', 1),
(5, 1, 'Nokturn', 'han', '2018-05-29', 1),
(6,1,  'Leonidas', 'sp', '2016-11-18', 1),
(6, 1, 'Nintendo', 'hc', '2015-03-22', 1),
(7, 2, 'Carlos', 'hc', '2011-02-15', 1),
(8, 2, 'Arras', 'sp', '2017-02-01', 1),
(9, 2, 'Isa', 'fryz', '2013-08-30', 1),
(9, 2, 'Dafne', 'fryz', '2017-03-14', 1),
(10, 2, 'Delicja', 'sl', '2012-04-28', 1),
(11, 3, 'Fiona', 'nn', '2011-04-11', 2),
(11, 3, 'Apple Pie', 'sp', '2010-02-19', 2),
(11, 3, 'Welur', 'hc', '2009-11-07', 2),
(11, 3, 'Leydis', 'oo', '2011-12-03', 2);

INSERT INTO Lekcja_jazdy(id_instruktor, dzien, cena, godzina, opis) VALUES
(3, 'Pn', 30, '16:00', 'poczatkujacy'),
(1, 'Pn', 30, '17:00', 'sredniozaawansowani'),
(1, 'Wt', 30, '15:00', 'sredniozaawansowani'),
(1, 'Wt', 30, '16:00', 'zaawansowani'),
(3, 'Wt', 50, '17:00', 'trening sportowy - skoki'),
(3, 'Sr', 30, '15:00', 'poczatkujacy'),
(3, 'Sr', 30, '16:00', 'poczatkujacy'),
(1, 'Sr', 30, '17:00', 'sredniozaawansowani'),
(1, 'Sr', 30, '18:00', 'zaawansowani'),
(3, 'Cz', 30, '16:00', 'poczatkujacy'),
(1, 'Cz', 30, '17:00', 'sredniozaawansowani'),
(1, 'Cz', 30, '18:00', 'zaawansowani'),
(1, 'Pt', 30, '15:00', 'sredniozaawansowani'),
(1, 'Pt', 30, '16:00', 'zaawansowani'),
(3, 'Pt', 50, '17:00', 'trening sportowy - skoki'),
(2, 'Pn', 70, '8:00', 'trening indywidualny'),
(2, 'Wt', 70, '8:00', 'trening indywidualny'),
(2, 'Wt', 70, '9:00', 'trening indywidualny'),
(2, 'Sr', 70, '8:00', 'trening indywidualny'),
(2, 'Cz', 70, '8:00', 'trening indywidualny'),
(2, 'Cz', 70, '9:00', 'trening indywidualny'),
(2, 'Pt', 70, '8:00', 'trening indywidualny');

INSERT INTO Lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES
(1, 1, 4),
(1, 1, 9),
(1, 1, 14),
(1, 2, 5),
(1, 2, 15),
(2, 3, 2),
(2, 3, 3),
(2, 3, 8),
(2, 3, 13),
(3, 4, 5),
(3, 4, 15), 
(3, 5, 16),
(3, 5, 9), 
(3, 5, 12), 
(4, 6, 1), 
(4, 6, 6), 
(4, 6, 13), 
(4, 7, 17), 
(4, 7, 21),
(5, 17, 1),
(5, 17, 7),
(5, 17, 10),
(6, 19, 2),
(6, 20, 8),
(6, 19, 11),
(7, 18, 2),
(7, 19, 8),
(7, 18, 11),
(8, 17, 3),
(8, 17, 8),
(8, 17, 13),
(9, 12, 2),
(9, 12, 5),
(9, 12, 9),
(9, 12, 15),
(9, 12, 20),
(10, 16, 2),
(10, 16, 18),
(10, 16, 19),
(10, 16, 14);

INSERT INTO kon_kontuzja(id_kon, id_weterynarz, id_kontuzja, data_urazu) VALUES
(9, 1, 2, '2020-11-19'),
(14, 2, 1, '2020-12-22'),
(13, 1, 1, '2020-12-15');