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
	request.then(res => { 
		console.log(res);

		if(res.length == 0) {
			res.status(404).json({ error: "The rep with the specified Id does not exist" });
		} else {
			console.log(res);
			res.status(200).json(res);
		}
	})
	.catch(err => {
		res.status(500).json({ err: "Failed to retrieve the rep" })
	});
})

router.post('/', (req, res) => {
	let { company_id, name, motto, phone_number, email, image_id} = req.body;
	let newRepresentative = { company_id, name, motto, phone_number, email, image_id };

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

	db
		.insert(newRepresentative)
		.then(representative => {
			console.log(representative);
			res.status(200).json(representative);
		})
		.catch(err => {
			res.status(500).json({ message: err.message });
		});
});
			
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
