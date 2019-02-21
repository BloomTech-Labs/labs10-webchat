
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {id: 1, name: 'customertest1', email: "emailtest1", summary: "summarytest1"},
        {id: 2, name: 'customertest2', email: "emailtest2", summary: "summarytest2"},
        {id: 3, name: 'customertest3', email: "emailtest3", summary: "summarytest4"}
      ]);
    });
};
