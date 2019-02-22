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
        const id = req.params.imgid;
        console.log('id is', id);

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

