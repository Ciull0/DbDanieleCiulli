const express = require('express');
const { url } = require('inspector');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/categoria', (req, res, next) => {
    db.query(
      'INSERT INTO categoria (descrizione, prezzo_giornaliero, prezzo_settimanale, prezzo_mensile) VALUES (?,?,?,?)',
      [req.body.descrizione, req.body.prezzo_giornaliero, req.body.prezzo_settimanale, req.body.prezzo_mensile],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("Inserito");
        }
      }
    );
  });

  router.post('/cliente', (req, res, next) => {
    db.query(
      'INSERT INTO cliente (nome,cognome,data_nascita,indirizzo,carta_credito) VALUES (?,?,?,?,?)',
      [req.body.nome, req.body.cognome, req.body.data_nascita, req.body.indirizzo, req.body.carta_credito],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("Inserito");
        }
      }
    );
  });

  router.get('/categoria', function (req, res, next) {
    db.query(
      'SELECT id, descrizione, prezzo_giornaliero, prezzo_settimanale, prezzo_mensile FROM categoria',
      [1000*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log("select ok");
        }
      }
    );
  });

  router.get('/clienti', function (req, res, next) {
    db.query(
      'SELECT id, nome, cognome, data_nascita, indirizzo , carta_credito FROM cliente',
      [1000*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log("select ok");
        }
      }
    );
  });

  router.get('/categoria/:id', function (req, res, next) {
    console.log(req.params.id);
    db.query(
      'SELECT * from auto where id_categoria=?',
      [req.params.id, 1000*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          console.log(req.body.id);
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/clienti/:id', function (req, res, next) {
    console.log(req.params.id);
    db.query(
      'SELECT noleggio.id, noleggio.data_inizio, noleggio.data_fine, auto.marca, auto.modello, auto.colore, categoria.descrizione, categoria.prezzo_giornaliero, categoria.prezzo_settimanale, categoria.prezzo_mensile from noleggio JOIN cliente on noleggio.id_cliente=cliente.id JOIN auto on noleggio.id_auto=auto.id JOIN categoria on categoria.id = auto.id_categoria where noleggio.id_cliente=?',
      [req.params.id, 1000*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          console.log(req.body.id);
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/autodisponibili', function (req, res, next) {
    console.log(req.params.id);
    db.query(
      'select id,marca,modello,colore from auto where id NOT IN (select id_auto from noleggio where date(data_fine) > date(now()) ) ;',
      [1000*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          console.log(req.body.id);
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/noleggio', (req, res, next) => {
    db.query(
      'INSERT INTO noleggio (id_cliente,id_auto,data_inizio,data_fine) VALUES (?,?,?,?)',
      [req.body.id_cliente, req.body.id_auto, req.body.data_inizio, req.body.data_fine],
      (error) => {
        if (error) {
          console.error("error");
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("Inserito Noleggio");
        }
      }
    );
  });

  router.put('/categoria/:id', function (req, res, next) {
    db.query(
      'UPDATE categoria SET descrizione = ?, prezzo_giornaliero = ?, prezzo_settimanale = ?, prezzo_mensile = ? WHERE id=?',
      [req.body.descrizione, req.body.prezzo_giornaliero, req.body.prezzo_settimanale, req.body.prezzo_mensile,req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/categoria/:id', function (req, res, next) {
    db.query(
      'DELETE FROM categoria WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/clienti/:id', function (req, res, next) {
    db.query(
      'DELETE FROM cliente WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("cliente Eliminato");
        }
      }
    );
  });

  router.delete('/noleggio/:id', function (req, res, next) {
    db.query(
      'DELETE FROM noleggio WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("noleggio Eliminato");
        }
      }
    );
  });

  router.delete('/auto/:id', function (req, res, next) {
    db.query(
      'DELETE FROM auto WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
          console.log("auto Eliminata");
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;