const db = require('../db.js');
 
module.exports = {
  get,
  getById,
  getByEmail,
  insert,
  remove,	
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


function getByEmail(email) {   // This is used when posting a customer to check if email is a duplicate
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

function remove(id){
        return db('customers')
               .where({id: Number(id)})
               .del();
};

// Cameron testing github contributions