
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/app.db3'
    },
    migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		}
  },

  testing: {
    client: 'postgressqlite3ql',
    connection: {
      database: './data/test.db',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || './data/app.db',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
