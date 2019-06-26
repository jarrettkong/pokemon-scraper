exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('pokemon', table => {
			table.timestamps(true, true);
		}),
		knex.schema.table('trainers', table => {
			table.timestamps(true, true);
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('pokemon', table => {
			table.dropColumn('created_at');
			table.dropColumn('updated_at');
		}),
		knex.schema.table('trainers', table => {
			table.dropColumn('created_at');
			table.dropColumn('updated_at');
		})
	]);
};
