exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('customers', table => {
            table.string('uid')
                .unique()
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('customers', table => {
            table.dropColumn('uid');
        })
    ])
};