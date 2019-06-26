const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

const createTrainer = (knex, trainer) => {
	return knex('trainers')
		.insert(
			{
				name: trainer.name,
				pokemon: trainer.pokemon
			},
			'id'
		)
		.then(id => {
			const joinerPromises = [];
			trainer.pokemon.forEach(p => {
				joinerPromises.push(createJoin(knex, id[0], p));
			});
			return Promise.all(joinerPromises);
		});
};

const createJoin = (knex, trainerID, pokemon) => {
	return knex('trainers_pokemon').insert({
		trainer_id: trainerID,
		pokemon_id: pokemon
	});
};

exports.seed = function(knex) {
	return knex('trainers_pokemon')
		.del()
		.then(() => knex('pokemon').del())
		.then(() =>
			knex('trainers')
				.del()
				.then(async () => {
					await knex.raw('TRUNCATE TABLE pokemon RESTART IDENTITY CASCADE');
					await knex.raw('TRUNCATE TABLE trainers RESTART IDENTITY CASCADE');
				})
		)
		.then(() => {
			return Promise.all([knex('pokemon').insert(pokemonData)]);
		})
		.then(() => {
			const trainerPromises = [];
			trainerData.forEach(trainer => {
				trainerPromises.push(createTrainer(knex, trainer));
			});
			return Promise.all(trainerPromises);
		})
		.then(() => console.log('Seeding Complete'))
		.catch(error => console.log(`Error seeding file: ${error}`));
};
