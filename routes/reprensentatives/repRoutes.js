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
