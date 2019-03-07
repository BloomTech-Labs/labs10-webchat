const db = require('../db.js');

module.exports = {
    insert,
    getQueue,
    deQueue,
    getActive,
    closeConvo,
    getClosed,
    closeConvoFromChatRepPage
}

// Create a new conversation:
function insert(convo) {
    return db('conversations')
    .insert(convo).returning('id').then(ids => ids[0]);
}

// Get conversation info to populate Queue using signed-in rep's uid
// Should return all convos for rep's company that are open and in the queue
function getQueue(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.id as convo_id",
            "conversations.customer_uid",
            "conversations.summary",
            "customers.name as customer_name"
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .innerJoin("customers", "conversations.customer_uid", "customers.uid")
        .where("representatives.uid", uid)
        .where("conversations.in_q", true);

    return query.then(details => {
	    return details;    // return full array of objects returned by query
	});
}

// Remove a conversation from the Queue by changing in_queue boolean to false
function deQueue(id, rep_uid) {
    return db('conversations')
        .where('id', id)
        .update({ in_q: false, rep_uid: rep_uid });
};

// Get conversation info to poppulate ActiveConvos using signed-in rep's uid
// Should return all conversations that are open, not in the queue, and have the rep's uid
function getActive(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.id as convo_id",
            "conversations.customer_uid",
            "conversations.summary",
            "customers.name as customer_name"
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .innerJoin("customers", "conversations.customer_uid", "customers.uid")
        .where("representatives.uid", uid)
        .where("conversations.in_q", false)
        .where("conversations.is_open", true)
        .where("conversations.rep_uid", uid);

    return query.then(details => {
	    return details;    // return full array of objects returned by query
	});
}

function closeConvo(id) {
    return db('conversations')
        .where('id', id)
        .update({ is_open: false });
};

function closeConvoFromChatRepPage(uid) {
    return db('conversations')
        .where('customer_uid', uid)
        .update({ is_open: false });
};

function getClosed(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.id as convo_id",
            "conversations.customer_uid",
            "conversations.summary",
            "customers.name as customer_name"
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .innerJoin("customers", "conversations.customer_uid", "customers.uid")
        .where("representatives.uid", uid)
        .where("conversations.in_q", false)
        .where("conversations.is_open", false)
        .where("conversations.rep_uid", uid);

    return query.then(details => {
	    return details;    // return full array of objects returned by query
	});
}