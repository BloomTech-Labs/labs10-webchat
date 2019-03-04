const db = require('../db.js');

module.exports = {
    getByRepUid
}

// Get conversation info to poppulate Queue using signed-in rep's uid
// * Potential To-Do: get customer's name to display for the rep
function getByRepUid(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.customer_uid",
            "conversations.summary",
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .where("representatives.uid", uid)
        .where("conversations.in_q", true;
}