exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('pokemon', table => {
			table.increments('id').primary();
			table.string('name');
			table.specificType('type', 'text ARRAY');
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
			table.specificType('pokemon', 'integer ARRAY');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('trainers_pokemon'),
		knex.schema.dropTable('trainers'),
		knex.schema.dropTable('pokemon')
	]);
};
