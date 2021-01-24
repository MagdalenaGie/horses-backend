const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const { pool } = require("./config");

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const home = (request, response) => response.send('Home Route Horses');

//GETY

const pobierzDaneKoni = (request, response) => {
    //const queryStr = 'SELECT k.imie, k.rasa, k.id_kon, k.data_ur, (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel), (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) FROM stadnina.kon k;'
    const queryStr = 'SELECT * FROM stadnina.kon_info'
    pool.query(queryStr, (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzDaneWlascicieli = (request, response) => {
    pool.query('SELECT * FROM stadnina.wlasciciel', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzDaneWeterynarzy = (request, response) => {
    pool.query('SELECT * FROM stadnina.weterynarz', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzRodzajeKontuzji = (request, response) => {
    pool.query('SELECT * FROM stadnina.kontuzja', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzKontuzjeKoni = (request, response) => {
    pool.query('SELECT * FROM stadnina.kon_kontuzja', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzKontuzjeKonia = (request, response) => {
    const id = parseInt(request.params.id);
    const queryInjuries = 'SELECT * FROM stadnina.kon_kontuzja_info WHERE id_kon = $1;'
    pool.query(queryInjuries, [id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzDaneStajennych = (request, response) => {
    pool.query('SELECT * FROM stadnina.stajenny', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzListeStajni = (request, response) => {
    pool.query('SELECT * FROM stadnina.stajnia', (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzListeLekcji = (request, response) => {
    const queryStr = 'SELECT * FROM stadnina.lekcja_info;'
    pool.query(queryStr, (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzDaneInstruktorow = (request, response) => {
    const queryStr = 'SELECT * FROM stadnina.instruktor;';
    pool.query(queryStr, (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzDaneKowali = (request, response) => {
    const queryStr = 'SELECT * FROM stadnina.kowal;';
    pool.query(queryStr, (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzUczestnikowLekcjiJazdy = (request, response) => {
    const id = parseInt(request.params.id);
    //const queryStr = 'SELECT (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_im, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_nzw, (SELECT k.imie from stadnina.kon k WHERE k.id_kon=p.id_kon) AS k_im from stadnina.lekcja_para p WHERE p.id_lekcja = $1;';
    const queryStr = 'SELECT * FROM stadnina.uczestnicy_zajec where id_lekcja = $1;'
    pool.query(queryStr, [id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzJednegoKonia = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM stadnina.kon WHERE id_kon = $1', [id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzKonieWlasciciela = (request, response) => {
    const id = parseInt(request.params.id)
        //const queryStr = 'SELECT k.imie, k.rasa, k.id_kon, k.data_ur, (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel), (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) FROM stadnina.kon k WHERE id_wlasciciel = $1';
    const queryStr = 'SELECT * FROM stadnina.konie_wlasciciela_info WHERE id_wlasciciel = $1;'
    pool.query(queryStr, [id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzKonieZeStajni = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM stadnina.kon WHERE id_stajnia = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const sprawdzHaslo = (request, response) => {
    const username = request.params.usrnm;

    pool.query('SELECT w.pass, w.id_wlasciciel FROM stadnina.wlasciciel w WHERE w.username = $1', [username], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })
}

const pobierzLekcjeKonia = (request, response) => {
    const id = parseInt(request.params.id)
        // const queryLessons=`SELECT
        // dzien, godzina, opis, imie, nazwisko, lp.id_lekcja, cena
        // FROM stadnina.lekcja_para lp JOIN stadnina.lekcja_jazdy lj on lp.id_lekcja = lj.id_lekcja JOIN stadnina.instruktor i on lj.id_instruktor = i.id_instruktor WHERE id_kon = $1;`
    const queryLessons = 'SELECT * FROM stadnina.lekcje_konia_info WHERE id_kon = $1;'
    pool.query(queryLessons, [id], (error, results) => {
        if (error) {
            console.log(error.message)
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(200).json(results.rows)
    })

}

//POSTY

const dodajKonia = (request, response) => {
    let { id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal } = request.body;
    pool.query(
        'INSERT INTO stadnina.kon (id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal) VALUES ($1, $2, $3, $4, $5, $6) returning *', [id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Horse cannot be added, this stabble is full - please choose different one.' })
                throw error
            }
            if (result.rowCount > 0) {
                response.status(201).json({ status: 'success', message: 'Horse added.', result: result.rows[0] })
            } else {
                response.status(409).json({ status: 'failed', message: 'Nie można zakwaterowac konia' })
            }

        }
    )
}

const dodajWlasciciela = (request, response) => {
    let { imie, nazwisko, telefon, username, pass } = request.body;
    pool.query(
        'INSERT INTO stadnina.wlasciciel (imie, nazwisko, telefon, username, pass) VALUES ($1, $2, $3, $4, $5) returning *', [imie, nazwisko, telefon, username, pass],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }

            if (result.rowCount > 0) {
                response.status(201).json({ status: 'success', message: 'Wlasciciel added.', result: result.rows[0] })
            } else {
                response.status(409).json({ status: 'failed', message: 'Nie można dodac wlasciciela' })
            }
        }
    )
}

const dodajStajennego = (request, response) => {
    let { imie, nazwisko } = request.body;
    pool.query(
        'INSERT INTO stadnina.stajenny (imie, nazwisko) VALUES ($1, $2) returning *', [imie, nazwisko],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            console.log(result);
            response.status(201).json({ status: 'success', message: 'Stajenny added.', result: result.rows[0] })
        }
    )
}

const dodajInstruktora = (request, response) => {
    let { imie, nazwisko } = request.body;
    pool.query(
        'INSERT INTO stadnina.instruktor (imie, nazwisko) VALUES ($1, $2) returning *', [imie, nazwisko],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            response.status(201).json({ status: 'success', message: 'Instruktor added.', result: result.rows[0] })
        }
    )
}

const zglosKontuzje = (request, response) => {
    let { id_kon, id_weterynarz, id_kontuzja, data_urazu } = request.body;
    pool.query(
        'INSERT INTO stadnina.kon_kontuzja (id_kon, id_weterynarz, id_kontuzja, data_urazu) VALUES ($1, $2, $3, $4) returning *', [id_kon, id_weterynarz, id_kontuzja, data_urazu],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            response.status(201).json({ status: 'success', message: 'Injury reported.', result: result.rows[0] })
        }
    )
}

const dodajTypKontuzji = (request, response) => {
    let { opis } = request.body;
    pool.query(
        'INSERT INTO stadnina.kontuzja (opis) VALUES ($1) returning *', [opis],
        (error, result) => {
            if (error) {
                vresponse.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            response.status(201).json({ status: 'success', message: 'New type of kontuzja added.', result: result.rows[0] })
        }
    )
}

const dodajLekcje = (request, response) => {
    let { id_instruktor, dzien, cena, godzina, opis } = request.body;
    pool.query(
        'INSERT INTO stadnina.lekcja_jazdy (id_instruktor, dzien, cena, godzina, opis) VALUES ($1, $2, $3, $4, $5) returning *', [id_instruktor, dzien, cena, godzina, opis],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            if (result.rowCount > 0) {
                response.status(201).json({ status: 'success', message: 'Lekcja added.', result: result.rows[0] })
            } else {
                response.status(409).json({ status: 'failed', message: 'Nie można dodac zajec w tym terminie' })
            }
        }
    )
}

const dodajPare = (request, response) => {
    let { id_wlasciciel, id_kon, id_lekcja } = request.body;
    console.log(id_wlasciciel, id_kon, id_lekcja);
    pool.query(
        'INSERT INTO stadnina.lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES ($1, $2, $3) returning *;', [id_wlasciciel, id_kon, id_lekcja],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            if (result.rowCount > 0) {
                response.status(201).json({ status: 'success', message: 'Para added.', result: result.rows[0] })
            } else {
                response.status(409).json({ status: 'failed', message: 'Nie udało się dodać pary na te zajęcia!' })
            }
        }
    )
}

const dodajWeterynarza = (request, response) => {
    let { imie, nazwisko, cena_wizyty, telefon } = request.body;
    pool.query(
        'INSERT INTO stadnina.weterynarz (imie, nazwisko, cena_wizyty, telefon) VALUES ($1, $2, $3, $4) returning *', [imie, nazwisko, cena_wizyty, telefon],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            response.status(201).json({ status: 'success', message: 'Weterynarz added.', result: result.rows[0] })
        }
    )
}

const dodajKowala = (request, response) => {
    let { imie, nazwisko, cena_uslugi, co_ile_tygodni } = request.body;
    pool.query(
        'INSERT INTO stadnina.kowal (imie, nazwisko, cena_uslugi, co_ile_tygodni) VALUES ($1, $2, $3, $4) returning *', [imie, nazwisko, cena_uslugi, co_ile_tygodni],
        (error, result) => {
            if (error) {
                response.status(409).json({ status: 'failed', message: 'Request failed' })
            }
            response.status(201).json({ status: 'success', message: 'Kowal added.', result: result.rows[0] })
        }
    )
}


//DELETE
const usunKonia = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM stadnina.kon WHERE id_kon=$1', [id], (error, results) => {
        if (error) {
            console.log(error);
            console.log(error.message);
            throw error
        }
        response.status(200).send(`Horse deleted with ID: ${id}`)
    })
}

const usunPare = (request, response) => {
    const id_kon = parseInt(request.params.idkon);
    const id_wlasciciel = parseInt(request.params.idwlasciciel);
    const id_lekcja = parseInt(request.params.idlekcja);

    pool.query('DELETE FROM stadnina.lekcja_para WHERE id_kon=$1 and id_wlasciciel=$2 and id_lekcja= $3', [id_kon, id_wlasciciel, id_lekcja],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results);
            response.status(200).send(`Pair deleted`);
        })
}

const usunKontuzje = (request, response) => {
    const id_kon = parseInt(request.params.idkon);
    const id_kontuzja = parseInt(request.params.idkontuzja);
    console.log(id_kon, id_kontuzja)
    pool.query(
        'DELETE FROM stadnina.kon_kontuzja WHERE id_kon=$1 and id_kontuzja=$2', [id_kon, id_kontuzja],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Injury reported.', result: result.rows[0] })
        }
    )
}

const usunLekcje = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM stadnina.lekcja_jazdy WHERE id_lekcja=$1 ', [id], (error, results) => {
        if (error) {
            console.log(error);
            console.log(error.message);
            throw error
        }
        response.status(200).send(`Lesson deleted with id: ${id}`)
    })
}

//PUT - UPDATE
const zmienHaslo = (request, response) => {
    const id = request.params.id;
    const newPass = request.body;
    pool.query('UPDATE stadnina.wlasciciel SET pass=$1 WHERE id_wlasciciel=$2 returning *', [newPass, id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(201).json({ status: 'success', message: 'Password succesfully changed', result: result.rows[0] })
    })
}

const zmienTerminLekcji = (request, response) => {
    const id = request.params.id;
    const {id_lekcja, godzina, dzien} = request.body;
    pool.query('UPDATE stadnina.lekcja_jazdy SET dzien=$1 godzina=$2 WHERE id_lekcja=$3 returning *', [dzien, godzina, id], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(201).json({ status: 'success', message: 'Lesson succesfully changed', result: result.rows[0] })
    })
}

const zmienStajennego = (request, response) => {
    //const id = request.params.id;
    const {id_stajenny, id_stajnia} = request.body;
    pool.query('UPDATE stadnina.stajnia SET id_stajenny=$1 WHERE id_stajnia=$2 returning *', [id_stajenny, id_stajnia], (error, results) => {
        if (error) {
            response.status(409).json({ status: 'failed', message: 'Request failed' })
        }
        response.status(201).json({ status: 'success', message: 'Stajenny succesfully changed', result: result.rows[0] })
    })
}




//ENDPOINTS
app
// GET endpoint
    .get('/', home)
    .get('/konie', pobierzDaneKoni)
    .get('/konie/:id', pobierzJednegoKonia)
    .get('/lekcjekonia/:id', pobierzLekcjeKonia)
    .get('/wlasciciele', pobierzDaneWlascicieli)
    .get('/wlasciciele/:id', pobierzKonieWlasciciela)
    .get('/stajnie', pobierzListeStajni)
    .get('/stajnie/:id', pobierzKonieZeStajni)
    .get('/usr/:usrnm', sprawdzHaslo)
    .get('/lekcje', pobierzListeLekcji)
    .get('/lekcje/:id', pobierzUczestnikowLekcjiJazdy)
    .get('/instruktorzy', pobierzDaneInstruktorow)
    .get('/kowale', pobierzDaneKowali)
    .get('/weterynarze', pobierzDaneWeterynarzy)
    .get('/urazy', pobierzRodzajeKontuzji)
    .get('/kontuzje', pobierzKontuzjeKoni)
    .get('/kontuzje/:id', pobierzKontuzjeKonia)
    .get('/stajenni', pobierzDaneStajennych)

// POST endpoint
    .post('/konie', dodajKonia)
    .post('/wlasciciele', dodajWlasciciela)
    .post('/stajenni', dodajStajennego)
    .post('/weterynarze', dodajWeterynarza)
    .post('/instruktorzy', dodajInstruktora)
    .post('/urazy', dodajTypKontuzji)
    .post('/kontuzje', zglosKontuzje)
    .post('/pary', dodajPare)
    .post('/lekcje', dodajLekcje)
    .post('/kowale', dodajKowala)

//PUT endpoints
    .put('/haslo/:id', zmienHaslo)
    .put('/lekcje/:id', zmienTerminLekcji)
    .put('/stajnia', zmienStajennego)

//DELETE endpoint
    .delete('/pary/:idkon/:idwlasciciel/:idlekcja', usunPare)
    .delete('/kontuzje/:idkon/:idkontuzja', usunKontuzje)
    .delete('/konie/:id', usunKonia)
    .delete('/lekcje/:id', usunLekcje)

app.listen(process.env.PORT || 5000, () => {
    console.log("server listening");
});