exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('subscriptions', table => {
            table.increments('id').primary();       
            table.integer('company_id')
                .references('id')
                .inTable('companies');  
            table.string('stripe_customer')      // "customer" in response object from stripe.subscirptions.create()
                .notNullable();
            table.string('stripe_subscription')  // "id" in response object from stripe.subscirptions.create()
                .notNullable();
            
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('messages')
    ])
};