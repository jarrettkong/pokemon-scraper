// Update with your config settings.

module.exports = {
	development: {
		client: 'pg',
		connection: 'postgress://localhost/pokemon',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	}
};
