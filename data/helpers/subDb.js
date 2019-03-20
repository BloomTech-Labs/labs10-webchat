const db = require('../db.js');

module.exports = {
    getSub,
    insert,
    updateByStripeCustomerId	
}

// check for existing sub
function getSub(company_id){
    const query = db('subscriptions').where('company_id', company_id);
    
    return query.first();

    // return query.then(subscriptions => {
    //     return subscriptions[0];
    // });
}


function insert(newSub) {
    return db('subscriptions')
    .insert(newSub).returning('id').then(ids => ids[0]);
}

function updateByStripeCustomerId(id, user){
        return db('subscriptions')
               .where({stripe_customer_id: id})
               .update(user);
}
