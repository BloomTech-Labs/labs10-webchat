
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert([
        {id: 1, name: 'TestCo 1', api_token: 'testtoken1'},
        {id: 2, name: 'TestCo 2', api_token: 'testtoken2'},
        {id: 3, name: 'TestCo 3', api_token: 'testtoken3'}
      ]);
    });
};
