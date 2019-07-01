const environment = process.env.NODE_ENV || 'development'; // Set correct dev environment, default of 'development'
const configuration = require('./knexfile')[environment]; // import knexfile from knex init
const db = require('knex')(configuration); // create reference to db from knex and knexfile
const express = require('express'); // import express
const app = express(); // create instance of express
const port = 3001; // set desired port to listen

app.use(express.json()); // allow express to parse json properly

app.get('/api/v1/pokemon', (req, res) => {
	// create GET endpoint at /api/v1/pokemon
	db('pokemon') // choose table from db
		.select() // select * from pokemon
		.then(pokemon => res.status(200).json(pokemon)) // return query result with status of 200
		.catch(error => res.status(500).json({ error })); // catch internal server error, return 500 code w/ error object
});

app.post('/api/v1/pokemon', (req, res) => {
	// create POST endpoint at /api/v1/pokemon
	const pokemon = req.body; // get pokemon data from request body
	const required = ['name', 'type', 'HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed']; // required keys for a pokemon

	for (let param of required) {
		// iterate through required params
		if (!pokemon[param]) {
			// check if req.body is missing any param
			return res.status(422).send(`Unprocessible Entity: Missing ${param} parameter.`); // if missing, send 422 error with corresponding message
		}
	}

	db('pokemon') // select pokemon table from db
		.insert(pokemon, 'id') // insert the new pokemon, and return the id value to the .then
		.then(id => res.status(201).send({ id: id[0] })) // send 201 created code w/ object containing the id of the new pokemon
		.catch(error => res.status(500).send({ error })); // catch internal server error, return 500 code w/ error object
});

app.get('/api/v1/trainers', (req, res) => {
	// create GET endpoint at /api/v1/trainers
	db('trainers') // select trainers table from db
		.select() // select * from trainers
		.then(async trainers => {
			// take trainers w/ pokemon id's, use join table to get appropriate data
			const mappedTrainers = trainers.map(async trainer => {
				// map over trainers
				await db('trainers_pokemon') // select trainers_pokemon table in db
					.where({ trainer_id: trainer.id }) // match trainer_id col in join table with each trainer
					.then(async pokemon => {
						// list of associated pokemon in their party
						const mappedPokemon = pokemon.map(async p => {
							// map over trainer pokemon
							const res = await db('pokemon').where({ id: p.pokemon_id }); // query pokemon table for specific pokemon
							return res[0] || null; // if no result return null else return the found pokemon
						});
						trainer.pokemon = await Promise.all(mappedPokemon); // reassign the trainer pokemon array to the array of queryed pokemon data
					});
				return trainer; // return trainer to map function
			});
			const result = await Promise.all(mappedTrainers); // wait until all trainers have been updated
			return res.status(200).json(result); // return 200 code w/ all mapped trainerz
		})
		.catch(error => res.status(500).json({ error })); // catch internal server error, return 500 code w/ response object
});

app.post('/api/v1/trainers', (req, res) => {
	// create POST endpoint at /api/v1/trainers
	const trainer = req.body; // parse request body to trainer var
	const required = ['id', 'name', 'pokemon']; // list of required params for a trainer

	for (let param of required) {
		// iterate through required params
		if (!trainer[param]) {
			// if req.body is missing any param
			return res.status(422).send(`Unprocessible Entity: Missing ${param} parameter.`); // return 422 code w/ corresponding message for missing param
		}
	}

	if (trainer.pokemon.length < 1 || trainer.pokemon.length > 6) {
		// check if party size is appropriate length
		return res.status(422).send('Pokemon party size should be between 1 and 6'); // return 422 code with corresponding message if not
	}

	db('trainers') // select trainers table in db
		.insert(trainer, 'id') // insert new trainer and return it's id value
		.then(id => res.status(201).send({ id: id[0] })) // pass id to .then() and return 201 created code with the id for the new trainer
		.catch(error => res.status(500).send({ error })); // catch internal server error, return 500 code w/ response object
});

app.get('/api/v1/pokemon/:id', (req, res) => {
	// create GET endpoint at /api/v1/pokemon/:id
	const id = parseInt(req.params.id); // parse ID value from endpoint url
	db('pokemon') // select pokemon table in db
		.where({ id }) // select * from pokemon where id = id
		.then(pokemon => {
			// pass query result to .then()
			if (!pokemon[0]) {
				// if there are no matches (returns array w/ no entries)
				return res.status(404).send(`No pokemon found with number ${id}`); // return 404 not found w/ message for corresponding id
			}
			return res.status(200).json(pokemon); // else return 200 code with the found pokemon
		})
		.catch(error => res.status(500).json({ error })); // catch internal server error, return 500 code w/ response object
});

app.get('/api/v1/trainers/:id', (req, res) => {
	// create GET endpoint at /api/v1/trainers/:id
	const id = parseInt(req.params.id); // parse ID from request
	db('trainers') // select trainers table
		.where({ id }) // select * from trainers where id = id
		.then(trainer => {
			// pass result to .then()
			if (!trainer[0]) {
				// if no found trainer
				return res.status(404).send(`No trainer found with id ${id}`); // return 404 not found w/ message for corresponding id
			}
			db('trainers_pokemon') // select trainers_pokemon table
				.where({ trainer_id: id }) // select all matching pokemon for specific trainer
				.then(async pokemon => {
					// pass list of pokemon to .then()
					const mappedPokemon = pokemon.map(async p => {
						// map over pokemon
						const res = await db('pokemon').where({ id: p.pokemon_id }); // query pokemon table for matching data
						return res[0] || null; // return match or null (ie. if it has been deleted)
					});
					trainer[0].pokemon = await Promise.all(mappedPokemon); // reassign pokemon with queryed data
					return res.status(200).json(trainer); // return 200 code w/ trainer data
				});
		})
		.catch(error => res.status(500).json({ error })); // catch internal server error, return 500 code w/ response object
});

app.delete('/api/v1/:table/:id', (req, res) => {
	// create DELETE endpoint at /api/v1/:table/:id
	const { table, id } = req.params; // parse table from request
	db(table) // select corresponding table based on line above
		.where({ id }) // select * from table where id = id
		.then(result => {
			// pass result to .then
			if (!result[0]) {
				// if no results
				return res.status(404).send(`No id ${id} found in table "${table}".`); // return 404 not found w/ message saying no id found in specific table
			}
			db(table) // select table again
				.where({ id }) // query based on matching id
				.del() // delete entry
				.then(() => res.sendStatus(204)); // return 204 no content
		})
		.catch(error => res.status(500).json({ error })); // catch internal server error, return 500 code w/ response object
});

app.listen(port, console.log(`Listening on port ${port}.`)); // tell express to listen on specified port and post message to console
