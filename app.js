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

app.post('/api/v1/pokemon', (req, res) => {
	const pokemon = req.body;
	const required = ['id', 'name', 'type', 'HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];

	for (let param of required) {
		if (!pokemon[param]) {
			return res.status(422).send('Unprocessible Entity');
		}
	}

	db('pokemon')
		.insert(pokemon, 'id')
		.then(pokemon => res.status(201).send({ id: pokemon[0] }))
		.catch(error => res.status(500).send({ error }));
});

app.get('/api/v1/trainers', (req, res) => {
	db('trainers')
		.select()
		.then(trainers => res.status(200).json(trainers))
		.catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/trainers', (req, res) => {
	const trainer = req.body;
	const required = ['id', 'name', 'pokemon'];

	for (let param of required) {
		if (!trainer[param]) {
			return res.status(422).send('Unprocessible Entity');
		}
	}

	if (trainer.pokemon.length < 1 || trainer.pokemon.length > 6) {
		return res.status(422).send('Unprocessible Entity');
	}

	db('trainers')
		.insert(trainer, 'id')
		.then(trainer => res.status(201).send({ id: trainer[0] }))
		.catch(error => res.status(500).send({ error }));
});

app.get('/api/v1/pokemon/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('pokemon')
		.where('id', id)
		.then(pokemon => res.status(200).json(pokemon))
		.catch(() => res.status(404).send(`No pokemon found with number ${id}`));
});

app.get('/api/v1/trainers/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('trainers')
		.where('id', id)
		.then(trainer => res.status(200).json(trainer))
		.catch(() => res.status(404).send(`No trainer found with id ${id}`));
});

app.listen(port, console.log(`Listening on port ${port}.`));
