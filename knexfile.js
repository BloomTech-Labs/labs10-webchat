// Update with your config settings.
const dbConnection = process.env.DATABASE_URL;

module.exports = {

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: 'host',
  //     user: 'username',     
  //     password: 'password',
  //     database: 'dbname',
  //     charset: 'utf8'
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: './data/seeds'
  //   },
  //   useNullAsDefault: true
  // },

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
