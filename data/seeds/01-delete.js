// The purpose of this file is to delete all data in the database without conflicts

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('representatives').del()
      .then(function () {
          return knex('customers').del()
              .then(function () {
                  return knex('approved_emails').del()
                      .then(function () {
                          return knex('companies').del()
                      })
              })
      })
};
