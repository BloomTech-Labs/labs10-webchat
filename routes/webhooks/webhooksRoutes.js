const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_IIa4T70SUFVds9GCRtSPpOucY3jh1EdS';


// Retrieve the raw body as a buffer and match all content types
//router.use(require('body-parser').raw({type: '*/*'}));



//const bodyParser = require('body-parser');
//router.use(bodyParser.raw({type: '*/*'}));

// Parse body to into JSON
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(cookieParser());


 /*router.use(bodyParser.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith('/stripe'))
        req.rawBody = buf.toString();
    }
  }));*/

/*function addRawBody(req, res, next) {
	req.setEncoding('utf8');
	var body = '';

   req.on('data', function(chunk) {
    body += chunk;
  });

   req.on('end', function() {
    req.rawBody = body;

     next();
  });
}*/




router.post('/', (req, res)=>{
	
	console.log('Response from stripe webhook is', req.body);
	
	/*var b ='';
		
		req
      		.setEncoding('utf-8')
      		.on('data', function(data) {
        		b += data;
			console.log('inside body is', b);
          		//res.statusCode = 413;
          		//res.end("Your message is too big for my little chat");
      		})
      		.on('end', function() {
        		console.log("END");
			req.rawBody = b;
			console.log('req.rawBody is', req.rawBody);
      		});*/
		

  	
		//console.log('Response from stripe webhook is', req.body);

		//verify if all webhooks are coming from Stripe
  		if(endpointSecret){
			console.log('secret is present');
		}
		

		let sig = req.headers['stripe-signature'];
  		console.log('sig is', sig);
		
		const request_stripe = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
		
		request_stripe.then(response =>{
  			console.log('response form stripe sig verify is ', response);
			res.sendStatus(200);
		})
		.catch(error =>{
   			console.log('error in stripe signature verification is', error.message);	 
   			//return res.sendStatus(401);
	 	})
	// Retrieve the request's body and parse it as JSON
        //const event_json = req.body;

        //Do something with event_json
        //console.log('req.body.data.status from stripe webhook', event_json);

	// Return a response to acknowledge receipt of the event
        //res.sendStatus(200);	
	
});

module.exports = router;
