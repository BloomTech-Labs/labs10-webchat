const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/repDb');


router.get('/', (req, res) => {
	db.get()
		.then(reps => {
			res.status(200).json(reps);
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
			res.status(400).json({ error: "The representative with the specified id does not exist" });
		} else {
			console.log(response_data);
			res.status(200).json(response_data);
		}
	})
	.catch(err => {
		res.status(500).json({ err: "Failed to retrieve represenative details" });
	});
})

router.post('/', (req, res) => {
	let { company_id, name, motto, phone_number, email, image_id} = req.body;
	
	if (!name) {
		res.status(400).json({message: 'Please provide your name.'});
		return;
	}
	if (!email) {
		res.status(400).json({message: 'Please provide an email address.'});
		return;
	}
	if (!image_id) {
		image_id = 1;
	}
	if (!company_id) {
		res.status(400).json({message: 'No company id, rep must be member of existing company.'});
		return;
	}
	let newRepresentative = { company_id, name, motto, phone_number, email, image_id };
	
	db
		.insert(newRepresentative)
		.then(representative => {
			console.log(representative);
			res.status(200).json(representative);
		})
		.catch(err => {
			const request = db.getByEmail(email);
			request.then(response_data => {
				console.log(response_data);
				if (response_data) {
					res.status(400).json({ error: 'The provided email is already associated with an account' });
				}
			});
		});
});


//update a representative's admin status

router.put('/adminstatus/:id', (req, res) => {
        const id = req.params.id;

        const is_admin = req.body.is_admin;
        const user = {is_admin};

        console.log(user);
        console.log(req.body);


        const request= db.update(id, user);

        request.then(response_data => {
                res.status(200).json(response_data);
        })

        .catch(error => {
                res.status(500).json({error: "Failed to update admin status"});
        })

});



router.delete('/:id', (req, res) => {
	const {id} = req.params;

	const request = db.remove(id);

	request.then(response_data => {
		res.status(200).json(response_data);
	})

	.catch(error => {
		res.status(500).json({error: "Failed to delete user"});
	})

});


module.exports = router;
