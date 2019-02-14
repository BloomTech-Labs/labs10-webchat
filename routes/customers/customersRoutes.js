const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/customersDb');


router.get('/', (req, res) => {
	db.get()
		.then(customers => {
			res.status(200).json(customers);
		})
		.catch(err => {
			res.status(500).json(err);
		})
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const request = db.getById(id);      
	request.then(res => { 
		console.log(res);

		if(res.length == 0) {
			res.status(404).json({ error: "The user with the specified Id does not exist" });
		} else {
			console.log(res);
			res.status(200).json(res);
		}
	})
	.catch(err => {
		res.status(500).json({ err: "Failed to retrieve the user" })
	});
})

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
	let newCustomer = { name, email, summary };
    db
        .insert(newCustomer)
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(err => {
            const withEmail = db.getByEmail(email);

        if (withEmail) {
            res.status(400).json({message: 'The provided email is already associated with an account.'});
        }
        // else:
        res.status(500).json({err});
    })
})


module.exports = router;