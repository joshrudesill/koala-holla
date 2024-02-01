const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg'); //import pg

// DB CONNECTION--POOL
const pool = new pg.Pool({
    database: "koalas",
    host: "localhost",
    port: 5432,
});

// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;