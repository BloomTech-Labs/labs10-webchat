const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/companiesDb');


router.get('/', (req, res) => {
	db.get()
		.then(companies => {
			res.status(200).json(companies);
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
			res.status(400).json({ error: "The company with the specified id does not exist" });
		} else {
			console.log(response_data);
			res.status(200).json(response_data);
		}
	})
	.catch(err => {
		res.status(500).json({ err: "Failed to retrieve company's details" });
	});
})

router.post('/', (req, res) => {
	let { name, api_token } = req.body;

	if (!name) {
		res.status(400).json({ message: 'Please provide company\'s name' });
		return;
	}
	if (!api_token) {
		res.status(400).json({ message: 'Please provide an api_token' });
		return;
	}

	let newCompany = { name, api_token };
	db
		.insert(newCompany)
		.then(company => {
			console.log(company);
			res.status(200).json(company);
		})
		.catch(err => {
			res.status(500).json({ err: 'Failed to add new company\'s name' });
		})
})

module.exports = router;