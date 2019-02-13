// test
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'host',
      user: 'username',     
      password: 'password',
      database: 'db',
      charset: 'utf8'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  // test: {
  //   client: 'pg',
  //   connection:'postgres://localhost/<examples_test>',
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds/test'
  //   },
  //   useNullAsDefault: true
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};