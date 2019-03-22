
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1, url: 'https://res.cloudinary.com/dvgfmipda/image/upload/v1553212670/pbp9mypnsvfnex9dxbo7.png'}
      ]);
    });
};
