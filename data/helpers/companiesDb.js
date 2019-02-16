const db = require('../db.js');

module.exports = {
  get,
  getById,
  insert,
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
