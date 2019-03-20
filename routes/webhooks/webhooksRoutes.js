const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_IIa4T70SUFVds9GCRtSPpOucY3jh1EdS';


// this middleware is used to caputure the req coming in which is a stream since this endpoint is not passed through body parser or express.json() since stripe needs raw body in constructEvent

router.use((req, res, next)=> {
  
	var data_stream ='';

                req
                .setEncoding('utf-8')
                .on('data', function(data) {            //each time there is data this is triggered and the data coming in streams is captured
                        data_stream += data;
                        console.log('data_stream is', data_stream);
                })
                .on('end', function() {                 //when the stream ends, this is triggered, attach data_stream to req.rawBody
                        console.log("Inside END");
                        console.log('data_stream is', data_stream);
			req.rawBody = data_stream;
			next();
		})	
});




router.post('/', (req, res)=>{
	
	console.log('req.rawBody  inside webhook endpoint is', req.rawBody);
	
			let sig = req.headers['stripe-signature'];
                	console.log('stripe signature is', sig);
	
		
		try {
   			let evs = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    			console.log('response form stripe signature verification is ', evs);

			// Send subscription update to database
  		}
  		catch (err) {
  			 console.log('error in stripe signature verification is', err.message);
                         res.sendStatus(400).json({ error: err.message });
		}


		//Return a response to stripe to acknowledge receipt of the webhook event
        	res.sendStatus(200);

		
});

module.exports = router;
