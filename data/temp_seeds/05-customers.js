
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {id: 1, name: 'customertest1', email: "emailtest1", summary: "summarytest1", uid:"hhh", company_id:1},
        {id: 2, name: 'customertest2', email: "emailtest2", summary: "summarytest2", uid:"tt", company_id:1},
        {id: 3, name: 'customertest3', email: "emailtest3", summary: "summarytest4", uid:"yyy", company_id:2}
      ]);
    });
};
