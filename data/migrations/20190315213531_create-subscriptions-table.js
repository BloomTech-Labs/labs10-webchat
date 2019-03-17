exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('subscriptions', table => {
            table.increments('id').primary();       
            table.integer('company_id')
                .references('id')
                .inTable('companies');  
            table.string('stripe_customer_id')          // Stripe-provided ID for Stripe customer account
                .notNullable();
            table.string('stripe_subscription_id')      // Stripe-provided ID for subscription, specific to customer account
                .notNullable();
            table.string('stripe_subscription_status')  // e.g., 'active'
                .notNullable();    
            table.string('stripe_plan_id')              // Stripe-provided ID for Stripe payment plan
                .notNullable();
            table.string('stripe_plan_nickname')        // e.g., 'Basic Monthly'
                .notNullable();
            table.integer('max_reps');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('subscriptions')
    ])
};