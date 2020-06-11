module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB
    }, 
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/test.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: '127.0.0.1',
			user: 'postgres',
			password: process.env.DB_URL,
			database: 'professor-app-test'
    }, 
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
