const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const port = process.env.PORT || 5000;

const repRoutes = require('./routes/reprensentatives/repRoutes');
const customersRoutes = require('./routes/customers/customersRoutes');
const companiesRoutes = require('./routes/companies/companiesRoutes');
const billingRoutes = require('./routes/billing');


server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());


server.get('/',(req, res) => {
  res.send("Welcome to Webchat app....");
});

server.use('/api/reps', repRoutes);
server.use('/api/customers', customersRoutes);
server.use('/api/companies', companiesRoutes);
server.use('/api/billing', billingRoutes);


server.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
  console.log(`=== API is listening at ${port} ===`);
});

