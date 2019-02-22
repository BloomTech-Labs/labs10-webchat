
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('approved_emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('approved_emails').insert([
        {id: 1, company_id: '1', email: 'webchattest1@grr.la'},
        {id: 2, company_id: '2', email: 'webchattest2@grr.la'},
        {id: 3, company_id: '2', email: 'webchattest3@grr.la'}
      ]);
    });
};
