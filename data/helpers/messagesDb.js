const db = require('../db.js');

module.exports = {
    insert
}

function insert(message) {
    return db('messages')
    .insert(message).returning('id').then(ids => ids[0]);
}