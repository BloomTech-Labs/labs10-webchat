exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('representatives', table => {
            table.string('uid')
                .unique();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('representatives', table => {
            table.dropColumn('uid');
        })
    ])
};