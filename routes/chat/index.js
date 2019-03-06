const express = require('express');
const router = express.Router();
const convosDb = require('../../data/helpers/convosDb');
const messagesDb = require('../../data/helpers/messagesDb');

// Create a new conversation:
router.post('/newconvo', (req, res) => {
    const convo  = {
        customer_uid: req.body.customer_uid,
        summary: req.body.summary,
        company_id: req.body.company_id
    }
    convosDb.insert(convo)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
})


// Get all conversations in queue using uid of signed-in rep:
router.get('/queue', (req, res) => {
    const uid  = req.body.uid;      // uid should come from server auth sequence based on rep's idToken
    const request = convosDb.getQueue(uid);
    request
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

// Remove conversation from Queue by changing in_q to false
router.put('/dequeue', (req, res) => {
    const id = req.body.id;
    const rep_uid = req.body.uid;
    const request = convosDb.deQueue(id, rep_uid);
    request
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

// Get all active conversations
router.get('/active', (req, res) => {
    const uid  = req.body.uid;      // uid should come from server auth sequence based on rep's idToken
    const request = convosDb.getActive(uid);
    request
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

// Close a conversation
router.put('/close', (req, res) => {
    const id = req.body.id;
    const request = convosDb.closeConvo(id);
    request
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})


module.exports = router;