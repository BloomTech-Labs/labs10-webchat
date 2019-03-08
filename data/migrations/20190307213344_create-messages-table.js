exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('messages', table => {
            table.increments('id').primary();       
            table.integer('conversation_id')
                .references('id')
                .inTable('conversations');  
            table.string('author_uid');    // Ideally this would be a FK but leaving it free for first iteration because author could be customer or rep; 
            table.string('body')
                .notNullable();  
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('messages')
    ])
};