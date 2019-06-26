const pokemonData = require('../../../pokemon');
const trainerData = require('../../../trainers');

exports.seed = function(knex, Promise) {
	return knex('pokemon')
		.del()
		.insert(pokemonData);
};
