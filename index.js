const express = require("express");
const cors = require("cors");
const {pool} = require("./config");

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const home = (request, response) => response.send('Home Route Horses');

//GETY

const getHorses = (request, response) => {
  const queryStr = 'SELECT k.imie, k.rasa, k.id_kon, k.data_ur, (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel), (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) FROM stadnina.kon k;'
  pool.query(queryStr, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOwners = (request, response) => {
  pool.query('SELECT * FROM stadnina.wlasciciel', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getWet = (request, response) => {
  pool.query('SELECT * FROM stadnina.weterynarz', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getInjuryTypes = (request, response) => {
  pool.query('SELECT * FROM stadnina.kontuzja', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getHorsesInjuries = (request, response) => {
  pool.query('SELECT * FROM stadnina.kon_kontuzja', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getHorseInjuries = (request, response) => {
  const id = parseInt(request.params.id);

  const queryInjuries=`select
  (SELECT k.opis FROM stadnina.kontuzja k WHERE k.id_kontuzja = kk.id_kontuzja) AS opis_urazu,
  (SELECT w.imie FROM stadnina.weterynarz w WHERE w.id_weterynarz = kk.id_weterynarz) AS w_imie,
  (SELECT w.nazwisko FROM stadnina.weterynarz w WHERE w.id_weterynarz = kk.id_weterynarz) AS w_nazw,
  kk.data_urazu,
  kk.id_kontuzja
  from stadnina.kon_kontuzja kk where kk.id_kon=$1;`

  pool.query(queryInjuries, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getWorkers = (request, response) => {
  pool.query('SELECT * FROM stadnina.stajenny', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStabbles = (request, response) => {
  pool.query('SELECT * FROM stadnina.stajnia', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLessons = (request, response) => {
  const queryStr = 'SELECT * , (SELECT i.imie FROM stadnina.instruktor i WHERE i.id_instruktor=j.id_instruktor) AS ins_imie, (SELECT i.nazwisko FROM stadnina.instruktor i WHERE i.id_instruktor=j.id_instruktor) AS ins_nazw FROM stadnina.lekcja_jazdy j;';
  pool.query(queryStr, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getInstructors = (request, response) => {
  const queryStr = 'SELECT * FROM stadnina.instruktor;';
  pool.query(queryStr, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFarriers = (request, response) => {
  const queryStr = 'SELECT * FROM stadnina.kowal;';
  pool.query(queryStr, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLessonParticipantsByLessonId = (request, response) => {
  const id = parseInt(request.params.id);
  const queryStr = 'SELECT (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_im, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=p.id_wlasciciel) AS j_nzw, (SELECT k.imie from stadnina.kon k WHERE k.id_kon=p.id_kon) AS k_im from stadnina.lekcja_para p WHERE p.id_lekcja = $1;';
  pool.query(queryStr, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getHorseByIdKon = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM stadnina.kon WHERE id_kon = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getHorsesByIdWlasciciel = (request, response) => {
    const id = parseInt(request.params.id)
    const queryStr = 'SELECT k.imie, k.rasa, k.id_kon, k.data_ur, (SELECT w.imie FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) AS w_imie, (SELECT w.nazwisko FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel), (SELECT w.telefon FROM stadnina.wlasciciel w WHERE w.id_wlasciciel=k.id_wlasciciel) FROM stadnina.kon k WHERE id_wlasciciel = $1';
    pool.query(queryStr, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getHorsesByStajniaId = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM stadnina.kon WHERE id_stajnia = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getPass = (request, response) => {
  const username = request.params.usrnm;
  
    pool.query('SELECT w.pass, w.id_wlasciciel FROM stadnina.wlasciciel w WHERE w.username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getHorseLessons = (request, response) => {
  const id = parseInt(request.params.id)

  const queryLessons=`SELECT
  dzien, godzina, opis, imie, nazwisko, lp.id_lekcja, cena
  FROM stadnina.lekcja_para lp JOIN stadnina.lekcja_jazdy lj on lp.id_lekcja = lj.id_lekcja JOIN stadnina.instruktor i on lj.id_instruktor = i.id_instruktor WHERE id_kon = $1;`
  
  pool.query(queryLessons, [id], (error, results) => {
    if (error) {
      console.log(error.message)
      throw error
    }
    response.status(200).json(results.rows)
  })

}

//POSTY

const addHorse = (request, response) => {
  let {id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal} = request.body;
  pool.query(
    'INSERT INTO stadnina.kon (id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal) VALUES ($1, $2, $3, $4, $5, $6) returning *',
    [id_stajnia, id_wlasciciel, imie, rasa, data_ur, id_kowal],
    (error, result) => {
      if (error) {
        response.status(201).json({status: 'failed', message: 'Horse cannot be added, this stabble is full - please choose different one.'})
        throw error
      }
      if(result.rowCount>0){
        response.status(201).json({status: 'success', message: 'Horse added.', result: result.rows[0]})
      }else{
        response.status(409).json({status: 'failed', message: 'Nie można zakwaterowac konia'})
      }
      
    }
  )
}

const addOwner = (request, response) => {
  let {imie, nazwisko, telefon, username, pass} = request.body;
  pool.query(
    'INSERT INTO stadnina.wlasciciel (imie, nazwisko, telefon, username, pass) VALUES ($1, $2, $3, $4, $5) returning *',
    [imie, nazwisko, telefon, username, pass],
    (error, result) => {
      if (error) {
        throw error
      }
      
      if(result.rowCount>0){
        response.status(201).json({status: 'success', message: 'Wlasciciel added.', result: result.rows[0]})
      }else{
        response.status(409).json({status: 'failed', message: 'Nie można dodac wlasciciela'})
      }
    }
  )
}

const addWorker = (request, response) => {
  let {imie, nazwisko} = request.body;
  pool.query(
    'INSERT INTO stadnina.stajenny (imie, nazwisko) VALUES ($1, $2) returning *',
    [imie, nazwisko],
    (error, result) => {
      if (error) {
        throw error
      }
      console.log(result);
      response.status(201).json({status: 'success', message: 'Stajenny added.', result: result.rows[0]})
    }
  )
}

const addInstructor = (request, response) => {
  let {imie, nazwisko} = request.body;
  pool.query(
    'INSERT INTO stadnina.instruktor (imie, nazwisko) VALUES ($1, $2) returning *',
    [imie, nazwisko],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Instruktor added.', result: result.rows[0]})
    }
  )
}

const addInjury = (request, response) => {
  let {id_kon, id_weterynarz, id_kontuzja, data_urazu} = request.body;
  pool.query(
    'INSERT INTO stadnina.kon_kontuzja (id_kon, id_weterynarz, id_kontuzja, data_urazu) VALUES ($1, $2, $3, $4) returning *',
    [id_kon, id_weterynarz, id_kontuzja, data_urazu],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Injury reported.', result: result.rows[0]})
    }
  )
}

const addInjuryType = (request, response) => {
  let {opis} = request.body;
  pool.query(
    'INSERT INTO stadnina.kontuzja (opis) VALUES ($1) returning *',
    [opis],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'New type of kontuzja added.', result: result.rows[0]})
    }
  )
}

const addLesson = (request, response) => {
  let {id_instruktor, dzien, cena, godzina, opis} = request.body;
  pool.query(
    'INSERT INTO stadnina.lekcja_jazdy (id_instruktor, dzien, cena, godzina, opis) VALUES ($1, $2, $3, $4, $5) returning *',
    [id_instruktor, dzien, cena, godzina, opis],
    (error, result) => {
      if (error) {
        throw error
      }
      if(result.rowCount>0){
        response.status(201).json({status: 'success', message: 'Lekcja added.', result: result.rows[0]})
      }else{
        response.status(409).json({status: 'failed', message: 'Nie można dodac zajec w tym terminie'})
      }
    }
  )
}

const addPair = (request, response) => {
  let {id_wlasciciel, id_kon, id_lekcja} = request.body;
  console.log(id_wlasciciel, id_kon, id_lekcja);
  pool.query(
    'INSERT INTO stadnina.lekcja_para(id_wlasciciel, id_kon, id_lekcja) VALUES ($1, $2, $3) returning *;',
    [id_wlasciciel, id_kon, id_lekcja],
    (error, result) => {
      if (error) {
        throw error
      }
      if(result.rowCount > 0 ){
        response.status(201).json({status: 'success', message: 'Para added.', result: result.rows[0]})
      }else {
        response.status(409).json({status: 'failed', message: 'Nie udało się dodać pary na te zajęcia!'})
      }
    }
  )
}

const addWet = (request, response) => {
  let {imie, nazwisko, cena_wizyty, telefon} = request.body;
  pool.query(
    'INSERT INTO stadnina.weterynarz (imie, nazwisko, cena_wizyty, telefon) VALUES ($1, $2, $3, $4) returning *',
    [imie, nazwisko, cena_wizyty, telefon],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Weterynarz added.', result: result.rows[0]})
    }
  )
}

const addFarrier = (request, response) => {
  let {imie, nazwisko, cena_uslugi, co_ile_tygodni} = request.body;
  pool.query(
    'INSERT INTO stadnina.kowal (imie, nazwisko, cena_uslugi, co_ile_tygodni) VALUES ($1, $2, $3, $4) returning *',
    [imie, nazwisko, cena_uslugi, co_ile_tygodni],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Kowal added.', result: result.rows[0]})
    }
  )
}


//DELETE
const deleteHorse = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM stadnina.kon WHERE id_kon=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Horse deleted with ID: ${id}`)
  })
}

const deletePair = (request, response) => {
  const id_kon = parseInt(request.params.idkon);
  const id_wlasciciel = parseInt(request.params.idwlasciciel);
  const id_lekcja = parseInt(request.params.idlekcja);

  pool.query('DELETE FROM stadnina.lekcja_para WHERE id_kon=$1 and id_wlasciciel=$2 and id_lekcja= $3', 
  [id_kon, id_wlasciciel, id_lekcja], 
  (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    response.status(200).send(`Pair deleted`);
  })
}

const deleteInjury = (request, response) => {
  const id_kon = parseInt(request.params.idkon);
  const id_kontuzja = parseInt(request.params.idkontuzja);
  console.log(id_kon, id_kontuzja)
  pool.query(
    'DELETE FROM stadnina.kon_kontuzja WHERE id_kon=$1 and id_kontuzja=$2',
    [id_kon, id_kontuzja],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Injury reported.', result: result.rows[0]})
    }
  )
}

//ENDPOINTS
app
  // GET endpoint
  .get('/', home)
  .get('/konie', getHorses)
  .get('/konie/:id', getHorseByIdKon)
  .get('/lekcjekonia/:id', getHorseLessons)
  .get('/wlasciciele', getOwners)
  .get('/wlasciciele/:id', getHorsesByIdWlasciciel)
  .get('/stajnie', getStabbles)
  .get('/stajnie/:id', getHorsesByStajniaId)
  .get('/usr/:usrnm', getPass)
  .get('/lekcje', getLessons)
  .get('/lekcje/:id', getLessonParticipantsByLessonId)
  .get('/instruktorzy', getInstructors)
  .get('/kowale', getFarriers)
  .get('/weterynarze', getWet)
  .get('/urazy', getInjuryTypes)
  .get('/kontuzje', getHorsesInjuries)
  .get('/kontuzje/:id', getHorseInjuries)
  .get('/stajenni', getWorkers)

  // POST endpoint
  .post('/konie', addHorse)
  .post('/wlasciciele', addOwner)
  .post('/stajenni', addWorker)
  .post('/weterynarze', addWet)
  .post('/instruktorzy', addInstructor)
  .post('/urazy', addInjuryType)
  .post('/kontuzje', addInjury)
  .post('/pary', addPair)
  .post('/lekcje', addLesson)
  .post('/kowale', addFarrier)

  //DELETE endpoint
  .delete('/pary/:idkon/:idwlasciciel/:idlekcja', deletePair)
  .delete('/kontuzje/:idkon/:idkontuzja', deleteInjury)
  .delete('/konie', deleteHorse)

app.listen(process.env.PORT || 5000, () => {
    console.log("server listening");
  });