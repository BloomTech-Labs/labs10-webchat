const db = require('../db.js');
  
module.exports = {
  get,
  getById,
  getByEmail,
  insert,
  update,
  remove,
};

function get(){
        return db('approved_emails');
}

function getById(id){
const query = db('approved_emails').where('id', id);

    return query.then(approved_emails => {
            return approved_emails[0];
    });
}

function getByEmail(email) {
const query = db('approved_emails').where('email', email);

    return query.then(approved_emails => {
            return approved_emails[0];
    });
}
