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


function insert(url) {
  return db('images')
    .insert(url).returning('id').then(ids => ids[0]);
}

function update(id, image){
        return db('images')
               .where({id: Number(id)})
               .update(image);
}

function remove(id){
        return db('images')
               .where({id: Number(id)})
               .del();
}
