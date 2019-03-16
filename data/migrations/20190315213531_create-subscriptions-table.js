exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('subscriptions', table => {
            table.increments('id').primary();       
            table.integer('company_id')
                .references('id')
                .inTable('companies');  
            table.string('stripe_customer_id')          
                .notNullable();
            table.string('stripe_subscription_id')      
                .notNullable();
            table.string('stripe_subscription_status')  
                .notNullable();    
            table.string('stripe_plan_id')             
                .notNullable();
            table.string('stripe_plan_nickname')        
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('subscriptions')
    ])
};