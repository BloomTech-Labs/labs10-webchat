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
	let { name, email, company_id } = req.body;
	if(!name) {
		res.status(400).json({message: 'Please provide your Name.'});
		return;
	}
	if(!email) {
		res.status(400).json({message: 'Please provide your Email.'});
      return;
	}
	if(!company_id) {
		res.status(400).json({message: 'Please identify your Company.'});
      return;
	}

	const request = db('companies').where('id', company_id);

	request.then(res => {
		db
		.insert(req.body)
		.then(representative => {
				res.status(200).json(representative);
		})
		.catch(err => {
				const withEmail = db.getByEmail(email);

				if (withEmail) {
						res.status(400).json({message: 'The provided email is already associated with an account.'});
				}
				// else:
				res.status(500).json({err});
	})
	.catch(err => {
		res.status(400).json({message: 'That company does not exhist! Please choose another Company.'})
		// This company doesn't exist
		// Redirect to company registration page so user can register)
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
