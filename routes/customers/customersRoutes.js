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
	request.then(response_data => { 
		console.log(response_data);

		if(response_data.length == 0) {
			res.status(404).json({ error: "The user with the specified Id does not exist" });
		} else {
			console.log(res);
			res.status(200).json(response_data);
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
            console.log("customer inside .then: ", customer);
            res.status(200).json(customer);
        })
        .catch(err => {
            const request = db.getByEmail(email);
            request.then(response_data => {
                console.log(response_data);
		        if (response_data) {
			        res.status(400).json({ error: 'The provided email is already associated with an account.' });
                } 
            });
        })
})


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to delete user"});
        })

});

module.exports = router;
