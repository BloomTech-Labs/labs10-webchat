const express = require('express');
const router = express.Router();
const db = require('../data/helpers/customersDb');


router.get('/', (req, res) => {
      res.status(200).send('Hello Customers....');
});


module.exports = router;
