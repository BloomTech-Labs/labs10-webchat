const db = require('../db.js');

module.exports = {
    getSub
}

// check for existing sub
function getSub(company_id){
    const query = db('subscriptions').where('company_id', company_id);
    
    return query.then(subscriptions => {
        return subscriptions[0];
    });
}