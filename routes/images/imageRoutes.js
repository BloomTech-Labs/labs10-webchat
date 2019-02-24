const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/imageDb');


router.get('/', (req, res) => {
        db.get()
                .then(images => {
                        res.status(200).json(images);
                })
                .catch(err => {
                        res.status(500).json(err.message);
                })
});


router.get('/:id', (req, res) => {
	console.log('req.params.id is:', req.params.id);
        const id = req.params.id;
        console.log('image id on server is', id);

        const request = db.getById(id);
        request.then(response_data => { 
                console.log(response_data);

                if(response_data.length == 0) {
                        res.status(400).json({ error: "The image with the specified id does not exist" });
                } else {
                        console.log(response_data);
                        res.status(200).json(response_data);
                }
        })
        .catch(err => {
                res.status(500).json({ err: err.message });
        })
});


router.post('/', (req, res) => {
        const url = req.body.url;

        console.log(url);

        if (!url) {
                res.status(400).json({ message: 'Please provide image url' });
                return;
        }

        let image = {url: url};
        const request = db.insert(image);

                request.then(image => {
                        console.log('image id is', image);
                        res.status(200).json(image);
                })
                .catch(err => {
                        res.status(500).json({ err: err.message});
                })
});



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
