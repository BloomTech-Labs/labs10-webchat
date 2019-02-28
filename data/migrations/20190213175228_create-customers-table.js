exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('customers', table => {
            table.increments('id').primary();              // id of the customer
            table.string('uid')
                .unique()
                .notNullable();
            table.integer('company_id')
                .references('id')
                .inTable('companies');
            table.string('name')
                .notNullable();
            table.string('email')
                .unique()
                .notNullable();
            table.string('summary')
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('customers')
    ])
};
