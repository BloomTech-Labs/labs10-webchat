exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('messages', table => {
            table.increments('id').primary();       
            table.integer('conversation_id')
                .references('id')
                .inTable('conversations');  
            table.string('author_uid');    // Ideally these 3 would be a FK but leaving free for faster development
            table.string('image_url');     // also for simplicity: 
            table.string('author_name');   // - image url and author name are stored directly here rather than referencing tables 
                                           // - because they're being emitted by socket.io before being stored in db and need all this info in the emmited message

            table.string('body')           // message body
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('messages')
    ])
};