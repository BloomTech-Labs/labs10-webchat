exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('conversations', table => {
            table.increments('id').primary();       
            table.integer('company_id')
                .references('id')
                .inTable('companies');
            table.string('rep_uid');     // will be nullable to start because rep will not be assigned when convo is created
            table.string('customer_uid') // will aslo serve as socket room name
                .references('uid')
                .inTable('customers');
            table.string('summary')
                .notNullable();     
            table.boolean('in_q')
                .defaultTo(true);
            table.boolean('is_open')
                .defaultTo(true);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('conversations')
    ])
};