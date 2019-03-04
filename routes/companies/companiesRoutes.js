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
	const name = req.body.name;
	const api_token = req.body.name;

	console.log(api_token);

	if (!name) {
		res.status(400).json({ message: 'Please provide company\'s name' });
		return;
	}
	//if (!api_token) {
	//	res.status(400).json({ message: 'Please provide an api_token' });
	//	return;
	//}

	let newCompany = { name, api_token };
	const request = db.insert(newCompany);
		
		request.then(company => {
			console.log('company_id is', company);
			res.status(200).json(company);
		})
		.catch(err => {
			res.status(500).json({ err: "Company name already exists" });
		})
});

router.delete('/:id', (req, res) => {
	const {id} = req.params;

	const request = db.remove(id);

	request.then(response => {
	res.status(200).json(response);
	})

	.catch(error => {
	res.status(500).json({error: "Failed to delete company", error });
	})

});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, api_token } = req.body;
	const newCompany = { name, api_token };
	if (!id) {
		res.status(404).json({ message: 'The company with the specified ID does not exist' });
	}
	else if (!newCompany) {
		res.status(404).json({ message: 'Please provide name and api_token for the company' });
	}
	companiesDb.update(id, newCompany)
		.then(company => {
			res.status(200).json({ message: 'The company has updated' });
		})
		.catch(err => {
			res.status(500).json({ error: 'The company information could not be modified', err });
		})
})


module.exports = router;
