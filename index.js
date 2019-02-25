const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./data/db.js');

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

  // io.emit or .on
  // socket.emit or .on
  
  socket.on('SEND_MESSAGE', function(data){
    console.log(data)
    const message = { message: data.message };
    console.log(message);
    // const request = db('test_messages').insert(message).returning('id').then(ids => ids[0]);
    // console.log(request);
    const companies = db("companies");
    console.log(companies);
    
    io.emit('RECEIVE_MESSAGE', data);
  });
  
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

// Any req coming into the server has to go through this verification:
app.use(async(req,res) => {                         
  console.log(req.headers.authorization);
        const idToken = req.headers.authorization;  // get the idToken from Auth header of the incoming req
	
  try {
    await admin.auth().verifyIdToken(idToken)       // verify the idToken with Firebase
      .then(decodedToken => {                       // get the decoded token back from Firebase
        console.log(decodedToken);
        // const uid = decodedToken.uid;               // get the uid from the Firebase decoded token
        // res.status(200).json(uid);                  // send back res with the uid
        req.body.uid = decodedToken.uid;            // add the uid from the decoded token the body of the original req
        return req.next();                          // return and move to the next (.then) part of the original req
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

