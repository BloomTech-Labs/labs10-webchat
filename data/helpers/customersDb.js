const db = require('../db.js');
 
module.exports = {
  get,
  getById,
  getByEmail,
  insert,
};
function get() {
  return db('customers');
};

function getById(id) {
  const query = db('customers').where('id', id);

  return query.then(customers => {
    return customers[0];
  });
};


function getByEmail(email) {
  // const query = db('customers').where('email', email);

  return db('customers').where('email', email)
    .then(customers => {
      return customers[0];
    });
};

function insert(user) {
  return db('customers')
    .insert(user).returning('id').then(ids => ids[0]);
};