const db = require('../db.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};
function get() {
  return db('companies');
};

function getById(id) {
  const query = db('companies').where('id', id);

  return query.then(companies => {
    return companies[0];
  });
};


function insert(company) {
  return db('companies')
    .insert(company).returning('id').then(ids => ids[0]);
};

function update(id, company){
  return db('companies')
    .where({id: Number(id)})
    .update(company);
}


function remove(id){
  return db('companies')
         .where({id: Number(id)})
         .del();
};

function updatePayment(id, paymentStatus) {
  return db('companies')
    .where({id: Number(id)})
    .update({ has_paid: paymentStatus });
}