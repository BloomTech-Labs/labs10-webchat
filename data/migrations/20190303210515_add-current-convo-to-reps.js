exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('representatives', table => {
            table.integer('current_convo_id')
                .references('id')
                inTable('conversations');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('representatives', table => {
            table.dropColumn('current_convo_id');
        })
    ])
};