
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('approved_emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('approved_emails').insert([
        {id: 1, company_id: '1', email: 'approved1@grr.la'},
        {id: 2, company_id: '2', email: 'approved2@grr.la'},
        {id: 3, company_id: '2', email: 'approved3@grr.la'},
        {id: 4, company_id: '2', email: 'approved4@grr.la'},
        {id: 5, company_id: '2', email: 'approved5@grr.la'}
      ]);
    });
};
