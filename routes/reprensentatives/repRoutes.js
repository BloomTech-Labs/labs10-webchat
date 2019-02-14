const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/repDb');


router.get('/', (req, res) => {
      res.status(200).send('Hello Representative....');
});


module.exports = router;