const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const failureEndpointSecret = process.env.STRIPE_FAILURE_ENDPOINT_SECRET;

// this middleware is used to caputure the req coming in which is a stream since this endpoint is not passed through body parser or express.json() since stripe needs raw body in constructEvent

router.use((req, res, next)=> {
  
	var data_stream ='';

                req
                .setEncoding('utf-8')
                .on('data', function(data) {            //each time there is data this is triggered and the data coming in streams is captured
                        data_stream += data;
                        //console.log('data_stream is', data_stream);
                })
                .on('end', function() {                 //when the stream ends, this is triggered, attach data_stream to req.rawBody
                        console.log("Inside END");
                        //console.log('data_stream is', data_stream);
			req.rawBody = data_stream;
			next();
		})	
});




router.post('/paymentsuccess', (req, res)=>{
	
	//console.log('req.rawBody  inside webhook endpoint is', req.rawBody);
	console.log('req.rawBody.type inside paymentsuccess webhook endpoint is', JSON.parse(req.rawBody).type);
	console.log('req.rawBody.data.object.customer is stripe_customer_id in subscriptions table inside webhook endpoint is', JSON.parse(req.rawBody).data.object.customer);
			
			const id = JSON.parse(req.rawBody).data.object.customer;  //id is stripe_customer_id in subscriptions table
			
			let sig = req.headers['stripe-signature'];
                	console.log('stripe signature is', sig);
				
		
		try {
   			let evs = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    			console.log('response form stripe signature verification is ', evs);
			
			// Send recurring payment status update to database
			const user ={stripe_subscription_status:'active'}
			
			const update_req = db.updateByStripeCustomerId(id, user);
			
			update_req.then(response_data => {
                		
				console.log('response_data after recurring payment update status', response_data);
				//res.status(200).json({message:"Success in recurring payment status update"});
        		})
        		.catch(error => {
                		
				console.log(error.message);
				//res.status(500).json({ error: error.message });
        		})

  			}
  		catch (err) {
  			 console.log('error in stripe signature verification is', err.message);
                         res.sendStatus(400).json({ error: err.message });
		}


		//Return a response to stripe to acknowledge receipt of the webhook event
        	res.sendStatus(200);

		
});


router.post('/paymentfailure', (req, res)=>{

        //console.log('req.rawBody  inside webhook endpoint is', req.rawBody);
        console.log('req.rawBody.type inside paymentfailure webhook endpoint is', JSON.parse(req.rawBody).type);
        console.log('req.rawBody.data.object.customer is stripe_customer_id in subscriptions table inside webhook endpoint is', JSON.parse(req.rawBody).data.object.customer);

                        const id = JSON.parse(req.rawBody).data.object.customer;  //id is stripe_customer_id in subscriptions table

                        let sig = req.headers['stripe-signature'];
                        console.log('stripe signature is', sig);


                try {
                        let evs = stripe.webhooks.constructEvent(req.rawBody, sig, failureEndpointSecret);
                        console.log('response form stripe signature verification is ', evs);

                        // Send recurring payment failure status update to database
                        const user ={stripe_subscription_status:'unpaid'}

                        const update_req = db.updateByStripeCustomerId(id, user);

                        update_req.then(response_data => {

                                console.log('response_data after recurring payment update status', response_data);
                                //res.status(200).json({message:"Success in recurring payment status update"});
                        })
                        .catch(error => {

                                console.log(error.message);
                                res.status(500).json({ error: error.message });
                        })

                        }
                catch (err) {
                         console.log('error in stripe signature verification is', err.message);
                         res.sendStatus(400).json({ error: err.message });
                }


                //Return a response to stripe to acknowledge receipt of the webhook event
                res.sendStatus(200);


});


module.exports = router;
