const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('pokemon')
		.del().insert(pokemonData)
};
