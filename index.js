const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// Changed Express Variable from server to App for Socket.io
const app = express();
if (process.env.ENVIRONMENT == 'development') { 
  require('dotenv').config(); 
}
const port = process.env.PORT || 5000;

const admin = require('firebase-admin');

// Socket.io
const socketIo = require('socket.io');
const http = require('http');
var server = http.createServer(app);
var io = socketIo(server);


io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
  
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const repRoutes = require('./routes/reprensentatives/repRoutes');
const customersRoutes = require('./routes/customers/customersRoutes');
const companiesRoutes = require('./routes/companies/companiesRoutes');
const billingRoutes = require('./routes/billing/billingRoutes');
const imageRoutes = require('./routes/images/imageRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.get('/',(req, res) => {
  res.send("Welcome to Webchat app....");
});


app.use(async(req,res) =>{
  console.log(req.headers.authorization);
        const idToken = req.headers.authorization;
	
  try {
    await admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        console.log(decodedToken);
        const uid = decodedToken.uid;
        res.status(200).json(uid);
      });
  }
  catch(e) {
    res.status(401).json({error:"You are not authorized"});
  }
});

app.use('/api/reps', repRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/images', imageRoutes);


app.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
  console.log(`=== API is listening at ${port} ===`);
});

