exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('representatives', table => {
            table.increments('id').primary();         // id of the rep/employee
            table.string('uid')
                .unique()
                .notNullable();
            table.integer('company_id')
                .references('id')
                .inTable('companies');
            table.string('name')
                .notNullable();
            table.string('motto');
            table.string('email')
                .unique()
                .notNullable();
            table.string('phone_number');
            table.integer('image_id')
                .references('id')                      // references the id of an image in images table
                .inTable('images')
                .notNullable();
            table.boolean('is_available')
                .defaultTo(false);
            table.boolean('is_admin')
                .defaultTo(false);
            
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('representatives')
    ])
};