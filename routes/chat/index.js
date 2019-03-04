const express = require('express');
const router = express.Router();
const convosDb = require('../../data/helpers/convosDb');
const messagesDb = require('../../data/helpers/messagesDb');

// Get all conversations in queue using uid of signed-in rep:
router.get('/conversations' (req, res) => {
    convosDb
})