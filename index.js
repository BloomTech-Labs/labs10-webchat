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
  // Client will emit "new_query" and send appropriate data to the server
  //socket.on("new_query", function(data) {
    // Rep client side will have a listener called "send_data"
    // "send_data" will send the data to the representative's data
    // Updates a mapped list of Queries in the Reps Live View
    // data = {
    //    email: "example@mail.com",
    //    name: "George Johnson",
    //    firstMessage: "Hello, this product I purchased doesn't seem to be working",
    //    url: "/chat/name=wonaje?32894dfsfs"
    // }
   // socket.emit("send_data", {data});
  //});
  console.log("user connected");
  socket.on("join", function(room_uid) {
  	console.log("user connected inside join"); 
  console.log('room_uid', room_uid);	  
    console.log("Room_uid from Firebase Login", room_uid);
    socket.join(room_uid);
  });

  socket.on("send_msg", function(data) {
    console.log("sending room post", data.room);
    socket.to(data.room).emit("Example username",data.message);
  });

  socket.on('SEND_MESSAGE', function(data){
    console.log("uuid", data.uuid);
    io.emit('RECEIVE_MESSAGE', data);
  });
  
  socket.on('disconnect', () => console.log('Client disconnected'));
});
  


const repRoutes = require('./routes/reprensentatives/repRoutes');
const customersRoutes = require('./routes/customers/customersRoutes');
const companiesRoutes = require('./routes/companies/companiesRoutes');
const billingRoutes = require('./routes/billing/billingRoutes');
const imageRoutes = require('./routes/images/imageRoutes');
const approvedemailRoutes = require('./routes/approvedemails/approvedemails');

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
app.use('/api/approvedemails', approvedemailRoutes);

app.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
  console.log(`=== API is listening at ${port} ===`);
});

