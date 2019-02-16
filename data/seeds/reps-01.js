
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('representatives').del()
    .then(function () {
      // Inserts seed entries
      return knex('representatives').insert([
        {id: 1, company_id: 1, name: 'Alex', motto: 'Eat', email: 'eat@ex.com', phone_number: '1234567890', image_id: 1, is_available: false, is_admin: false},
        {id: 2, company_id: 2, name: 'May', motto: 'Live', email: 'live@live.com', phone_number: '1234567890', image_id: 1, is_available: false, is_admin: false},
        {id: 3, company_id: 3, name: 'Roridan', motto: 'Surfin til the sun goes down', email: 'Water@wliquid.com', phone_number: '1234567890', image_id: 1, is_available: false, is_admin: false}
      ]);
    });
};
