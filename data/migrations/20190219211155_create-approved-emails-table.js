exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('approved_emails', table => {
            table.increments('id').primary();       // id of the customer
            table.integer('company_id')
                .references('id')
                .inTable('companies');
            table.string('email')
                .unique()
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('approved_emails')
    ])
};