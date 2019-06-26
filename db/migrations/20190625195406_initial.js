exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('pokemon', table => {
			table.increments('id').primary();
			table.string('name');
			table.json('type');
			table.integer('HP');
			table.integer('Attack');
			table.integer('Defense');
			table.integer('Sp Attack');
			table.integer('Sp Defense');
			table.integer('Speed');
		}),
		knex.schema.createTable('trainers_pokemon', table => {
			table
				.integer('pokemon_id')
				.unsigned()
				.references('pokemon.id');
			table
				.integer('trainer_id')
				.unsigned()
				.references('trainers.id');
		}),
		knex.schema.createTable('trainers', table => {
			table.increments('id').primary();
			table.string('name');
			table.json('pokemon');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([knex.schema.dropTable('trainers'), knex.schema.dropTable('pokemon')]);
};
