const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/customersDb');

router.post('/', (req, res) => {         // POST to '/api/customers/'
    let { name, email, summary } = req.body;
    // Some error checking; could be eliminated if more efficient method is found
    if (!name) {
        res.status(400).json({message: 'Please provide your name.'});
        return;
    }
    if (!email) {
        res.status(400).json({message: 'Please provide an email address.'});
        return;
    }
    if (!summary) {
        res.status(400).json({message: 'Please provide a summary of your inquiry.'});
        return;
    }
    db
        .insert(newCustomer)
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(err => {
            const withEmail = await db.select().from('users').where({ email }).first();

            if (withName) {
                res.status(400).json({message: 'Duplicate name or email!', duplicateUser: withName !== undefined, duplicateEmail: withEmail !== undefined});
            }
            // else:
            res.status(500).json({message: 'internal server error'});
            
        })
})

module.exports = router;