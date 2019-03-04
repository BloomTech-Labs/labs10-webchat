const express = require('express');
const router = express.Router();
const convosDb = require('../../data/helpers/convosDb');
const messagesDb = require('../../data/helpers/messagesDb');

// Get all conversations in queue using uid of signed-in rep:
router.get('/queue' (req, res) => {
    const uid  = req.body.uid;      // uid should come from server auth sequence based on rep's idToken
    convosDb.getByRepUid(uid)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})