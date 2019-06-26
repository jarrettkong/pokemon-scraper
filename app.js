const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express')
const app = express();
const port = 3001

app.use(express.json())



app.listen(port, console.log(`Listening on port ${port}.`))