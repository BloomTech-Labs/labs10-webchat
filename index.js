const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./data/db.js');
const messagesDb = require('./data/helpers/messagesDb');

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
  console.log("A user connected");

  socket.on("join", function(data) {
  	console.log("user connected inside join"); 
  	console.log('room_uid is ', data.socket_uid);	  
   	console.log('message body is ', data.body); 
    socket.join(data.socket_uid);
    console.log('data.socket_uid for server emit: ', data.socket_uid);
    io.sockets.in(data.socket_uid).emit(data.socket_uid, data);

    let dbMessage = {  // everything but the uid, which was only needed for socket room
      conversation_id: data.conversation_id,
      author_uid: data.author_uid,
      author_name: data.author_name,
      image_url: data.image_url,
      body: data.body,
    };
    messagesDb.insert(dbMessage)
      .then(response => {
        console.log('message added to db: ', dbMessage);
      })
      .catch(error => {
        console.log(error.message);
      });
  });	
  
	socket.on('disconnect', () => console.log('Client disconnected'));
});


const repRoutes = require('./routes/reprensentatives/repRoutes');
const customersRoutes = require('./routes/customers/customersRoutes');
const companiesRoutes = require('./routes/companies/companiesRoutes');
const billingRoutes = require('./routes/billing/billingRoutes');
const imageRoutes = require('./routes/images/imageRoutes');
const approvedemailRoutes = require('./routes/approvedemails/approvedemails');
const chatRoutes = require('./routes/chat/index');
const webhooksRoutes = require('./routes/webhooks/webhooksRoutes');

//trying to send raw req for stripe signature to verify, hence calling this endpoint before app.use(express.json());

//stripe webhook endpiont
app.use('/api/webhook', webhooksRoutes);

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

//stripe webhook endpiont
//app.use('/api/webhook', webhooksRoutes);

app.get('/',(req, res) => {
  res.send("Welcome to Webchat app....");
});




// Any req coming into the server has to go through this verification:
app.use(async(req,res) => {                         
  // console.log(req.headers.authorization);
  const idToken = req.headers.authorization;  // get the idToken from Auth header of the incoming req
	
  try {
    await admin.auth().verifyIdToken(idToken)       // verify the idToken with Firebase
      .then(decodedToken => {                       // get the decoded token back from Firebase
        // console.log(decodedToken);
        // const uid = decodedToken.uid;               // get the uid from the Firebase decoded token
        // res.status(200).json(uid);                  // send back res with the uid
        // console.log('auth req.body before: ', req.body);
        req.body.uid = decodedToken.uid;            // add the uid from the decoded token the body of the original req
        // console.log('auth req.body after: ', req.body);
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
app.use('/api/chat', chatRoutes);

app.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


server.listen(port, () => {
  console.log(`=== API is listening at ${port} ===`);
});

