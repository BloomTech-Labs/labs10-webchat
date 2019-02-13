const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());


server.get('/',(req, res) => {
        res.send("Welcome to Webchat app....");
});


server.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
});

