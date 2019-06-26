const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/v1/pokemon', (req, res) => {
	db('pokemon')
		.select()
		.then(pokemon => res.status(200).json(pokemon))
		.catch(error => res.status(500).json({ error }));
});

app.listen(port, console.log(`Listening on port ${port}.`));
