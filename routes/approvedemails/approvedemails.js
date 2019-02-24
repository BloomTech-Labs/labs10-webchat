const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/approvedemailDb');



router.get('/', (req, res) => {
        	const request = db.get();
                
		request.then(approvedemails => {
                        res.status(200).json(approvedemails);
                })
                .catch(err => {
                        res.status(500).json({err: err.message});
                })
});

router.get('/:id', (req, res) => {
        const id = req.params.id;
        const request = db.getById(id);

        request.then(response_data => { 
                console.log(response_data);

                if(response_data.length == 0) {
                        res.status(400).json({ error: "The user  with the specified id does not exist" });
                } else {
                        console.log(response_data);
                        res.status(200).json(response_data);
                }
        })
        .catch(err => {
                res.status(500).json({ err: err.message });
        });
})


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: error.message });
        })

});

module.exports = router;
