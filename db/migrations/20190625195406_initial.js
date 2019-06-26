exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('pokemon', table => {
			table.increments('id').primary();
			table.string('name');
			table.json('type');
			table.number('HP');
			table.number('Attack');
			table.number('Defense');
			table.number('Sp. Attack');
			table.number('Sp. Defense');
			table.number('Speed');
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
