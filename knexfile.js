// Update with your config settings.
const dbConnection = process.env.DATABASE_URL || 'development';

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'cameronwebchat',     
      password: 'webchat',
      database: 'webchatdbdev',
      charset: 'utf8'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
	  min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  }

};
