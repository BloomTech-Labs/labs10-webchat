const db = require('../db.js');

module.exports = {
    insert,
    getAllFromConvo
}

function insert(message) {
    return db('messages')
    .insert(message).returning('id').then(ids => ids[0]);
}

// Get messages for a convo using that convo's id: 
function getAllFromConvo(convo_id) {
    console.log("convo_id in get messages helper: ", convo_id);
    const query = db
        .select([
            "messages.author_name",
            "messages.body",
            "messages.image_url"
        ])
        .from("messages")
        .where("messages.conversation_id", convo_id);

    return query.then(details => {
        return details;    // return full array of objects returned by query
    });
}