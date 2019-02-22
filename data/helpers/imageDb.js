const db = require('../db.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get(){
        return db('images');
}

function getById(id){
const query = db('images').where('id', id);

    return query.then(images => {
            return images[0];
    });
}


function insert(image) {
  return db('images')
    .insert(image).returning('id').then(ids => ids[0]);
}
