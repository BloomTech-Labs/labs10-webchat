exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('companies', table => {
            table.increments('id').primary();           // id of the company
            table.string('name')
                .unique()
                .notNullable();
            table.string('api_token')
                .unique()
                .notNullable();
            table.boolean('has_paid')
                .notNullable()
                .defaultTo(false);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('companies')
    ])
};