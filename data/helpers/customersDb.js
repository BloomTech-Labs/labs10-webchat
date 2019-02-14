const db = require('../db.js');
 
module.exports = {
  get,
  getById,
  insert,
};

function get(){
  return db('customers');
};

function getById(id){
const query = db('customers').where('id', id);

  return query.then(customers => {
    return customers[0];
  });
};

function insert(user) {
  return db('customers')
    .insert(user).returning('id').then(ids => ids[0]);
};