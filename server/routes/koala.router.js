const express = require("express");
const router = express.Router();
const pg = require("pg"); //import pg

// DB CONNECTION--POOL
const pool = new pg.Pool({
  database: "koalas",
  host: "localhost",
  port: 5432,
});

// GET
router.get("/", (req, res) => {
  let getQueryText = `SELECT * FROM "koalas";`;

  pool
    .query(getQueryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error getting koala data", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  let newKoala = req.body;
  console.log(`Adding new koala`, newKoala);

  let queryText = `INSERT INTO "koalas" ("name", "favorite_color", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [...newKoala])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new koala`, error);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:id", (req, res) => {
  console.log(`PUT on the server`);
  let id = req.params.id;

  let putsqlText = "";
  pool
    .query(putsqlText, [id])
    .then((result) => {
      console.log(`put query worked. ${putsqlText}`, result);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`put query failed. ${putsqlText}`, err);
      res.sendStatus(500);
    });
});

// DELETE

module.exports = router;
