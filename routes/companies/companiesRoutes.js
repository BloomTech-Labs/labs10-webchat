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

module.exports = router;