const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

exports.seed = function(knex) {
	return knex('pokemon')
		.del()
		.then(async () => {
			await knex('trainers').del();
			await knex.raw('TRUNCATE TABLE pokemon RESTART IDENTITY CASCADE');
			await knex.raw('TRUNCATE TABLE trainers RESTART IDENTITY CASCADE');
		})
		.then(() => {
			return Promise.all([knex('pokemon').insert(pokemonData)]);
		})
		.then(() => {
			return Promise.all([knex('trainers').insert(trainerData)]);
		})
		.then(() => console.log('Seeding Complete'))
		.catch(() => console.log('Error seeding file'));
};
