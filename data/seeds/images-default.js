
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1, url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png'}
      ]);
    });
};
