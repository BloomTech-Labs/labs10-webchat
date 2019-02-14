exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('companies', table => {
            table.increments('id').primary();           // id of the company
            table.string('api_token')
                .unique()
                .notNullable()
        })
    ])
};
// about to run create tools table migration
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('companies')
    ])
};