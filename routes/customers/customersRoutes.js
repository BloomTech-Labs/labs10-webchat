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


module.exports = router;