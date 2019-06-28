exports.up = function(knex) {
	return Promise.all([
		knex.schema.alterTable('pokemon', table => {
			table
				.integer('id')
				.unsigned()
				.primary()
				.alter();
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.alterTable('pokemon', table => {
			table
				.increments('id')
				.primary()
				.alter();
		})
	]);
};
