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
        return db('representatives');
}

function getById(id){
const query = db('representatives').where('id', id);

    return query.then(representatives => {
            return representatives[0];
    });
}

function getByUid(uid){
        const query = db('representatives').where('uid', uid);
        
            return query.then(representatives => {
                return representatives[0];
            });
}

function getByEmail(email) {
const query = db('representatives').where('email', email);

    return query.then(representatives => {
            return representatives[0];
    });
}

function insert(user) {
  return db('representatives')
    .insert(user).returning('id').then(ids => ids[0]);
}


function update(id, user){
        return db('representatives')
               .where({id: Number(id)})
               .update(user);
}

function remove(id){
        return db('representatives')
               .where({id: Number(id)})
               .del();
}
