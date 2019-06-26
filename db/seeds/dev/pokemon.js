const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

exports.seed = function(knex, Promise) {
	return knex('pokemon')
		.del()
		.then(() => knex('trainers').del())
		.then(() => {
			return Promise.all([knex('pokemon').insert(pokemonData)]);
		})
		.then(() => {
			return Promise.all([knex('trainers').insert(trainerData)]);
		})
		.then(() => console.log('Seeding Complete'))
		.catch(() => console.log('Error seeding file'));
};
