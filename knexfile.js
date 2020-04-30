
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:  "./data/app.db3",
    migrations: {
      directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		}
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3', 
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
