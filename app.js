const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/pokemon', (req, res) => {
	db('pokemon')
		.select()
		.then(pokemon => res.status(200).json(pokemon))
		.catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/pokemon', (req, res) => {
	const pokemon = req.body;
	const required = ['name', 'type', 'HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed'];

	for (let param of required) {
		if (!pokemon[param]) {
			return res.status(422).send(`Unprocessible Entity: Missing ${param} parameter.`);
		}
	}

	db('pokemon')
		.insert(pokemon, 'id')
		.then(id => res.status(201).send({ id: id[0] }))
		.catch(error => res.status(500).send({ error }));
});

app.get('/api/v1/trainers', (req, res) => {
	db('trainers')
		.select()
		.then(async trainers => {
			const mappedTrainers = trainers.map(async trainer => {
				await db('trainers_pokemon')
					.where({ trainer_id: trainer.id })
					.then(async pokemon => {
						const mappedPokemon = pokemon.map(async p => {
							const res = await db('pokemon').where({ id: p.pokemon_id });
							return res[0] || null;
						});
						trainer.pokemon = await Promise.all(mappedPokemon);
					});
				return trainer;
			});
			const result = await Promise.all(mappedTrainers);
			return res.status(200).json(result);
		})
		.catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/trainers', (req, res) => {
	const trainer = req.body;
	const required = ['id', 'name', 'pokemon'];

	for (let param of required) {
		if (!trainer[param]) {
			return res.status(422).send(`Unprocessible Entity: Missing ${param} parameter.`);
		}
	}

	if (trainer.pokemon.length < 1 || trainer.pokemon.length > 6) {
		return res.status(422).send('Pokemon party size should be between 1 and 6');
	}

	db('trainers')
		.insert(trainer, 'id')
		.then(trainer => res.status(201).send({ id: trainer[0] }))
		.catch(error => res.status(500).send({ error }));
});

app.get('/api/v1/pokemon/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('pokemon')
		.where({ id })
		.then(pokemon => {
			if (!pokemon[0]) {
				return res.status(404).send(`No pokemon found with number ${id}`);
			}
			return res.status(200).json(pokemon);
		})
		.catch(error => res.status(500).json({ error }));
});

app.get('/api/v1/trainers/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('trainers')
		.where({ id })
		.then(trainer => {
			if (!trainer[0]) {
				return res.status(404).send(`No trainer found with id ${id}`);
			}
			db('trainers_pokemon')
				.where({ trainer_id: id })
				.then(async pokemon => {
					const mappedPokemon = pokemon.map(async p => {
						const res = await db('pokemon').where({ id: p.pokemon_id });
						return res[0] || null;
					});
					trainer[0].pokemon = await Promise.all(mappedPokemon);
					return res.status(200).json(trainer);
				});
		})
		.catch(error => res.status(500).json({ error }));
});

app.delete('/api/v1/:table/:id', (req, res) => {
	const { table, id } = req.params;
	db(table)
		.where({ id })
		.then(pokemon => {
			if (!pokemon[0]) {
				return res.status(404).send(`No id ${id} found in table "${table}".`);
			}
			db(table)
				.where({ id })
				.del()
				.then(() => res.sendStatus(204));
		})
		.catch(error => res.status(500).json({ error }));
});

app.listen(app.get('port'), console.log(`Listening on port ${app.get('port')}.`));
