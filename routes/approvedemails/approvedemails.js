const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/approvedemailDb');



router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: error.message });
        })

});

module.exports = router;
