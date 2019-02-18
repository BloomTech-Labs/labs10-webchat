exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('companies', table => {
            table.boolean('has_paid')
                .defaultTo(false);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('companies' => {
            table.dropColumn('has_paid');
        }
    ])
};