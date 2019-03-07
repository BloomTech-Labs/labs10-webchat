const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const db = require('../../data/helpers/customersDb');
const dbrep = require('../../data/helpers/repDb');



if(process.env.NODE_ENV !== 'production'){
 require('dotenv').load();
}


// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DB_URL
});


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,	
  };
  firebase.initializeApp(config);    //initialize firebase by passing config variables obtained after creating an account with firebase

const auth = firebase.auth();


router.get('/', (req, res) => {
	db.get()
		.then(customers => {
			res.status(200).json(customers);
		})
		.catch(err => {
			res.status(500).json(err);
		})
});


router.get('/getbyUID', (req, res) => {
        const uid  = req.body.uid;
        console.log('uid is', uid);


                const request = db.getByUid(uid);

                request.then(response_data => { 
                        console.log(response_data);

                        if(response_data.length == 0) {
                                res.status(400).json({ error: "The customer with the specified id does not exist" });
                        }
                        else {
                                console.log(response_data);
                                res.status(200).json(response_data);

                        }
                })
                .catch(err => {
                        res.status(500).json({ err: err.message });
                })

});


router.get('/company/:id', (req, res) => {
	const id = req.params.id;    //rep_id
	
	console.log('rep_is id', id);

        const request = dbrep.getById(id);   //make a call to teh re db to get company_id
        
	request.then(response=> { 
		console.log('company_id',response.company_id);

        	const company_id = response.company_id;
		

		//get all the customers that belong to the same compnay
		const req_all = db.getByCompanyId(company_id);

		req_all.then(response_data=> { 
                	console.log('all customers that belong to the same compnay',response_data);
			res.status(200).json(response_data);
		})
		.catch(error => {
                	res.status(500).json({ err: error.message });
        	})

	})
        .catch(err => {
                res.status(500).json({ err: err.message });
        })	

})


router.get('/:id', (req, res) => {
        const id = req.params.id;
        const request = db.getById(id);
        request.then(response_data => { 
                console.log(response_data);

                if(response_data.length == 0) {
                        res.status(404).json({ error: "The user with the specified Id does not exist" });
                } else {
                        console.log(res);
                        res.status(200).json(response_data);
                }
        })
        .catch(err => {
                res.status(500).json({ err: "Failed to retrieve the user" });
        })
})



router.post('/', (req, res) => {         // POST to '/api/customers/'

    	let { name, email, summary, company_id, uid } = req.body;
	
	let newCustomer = { name, email, summary, company_id, uid };
    	
	const request = db.insert(newCustomer);

        request.then(response => {
            console.log("customer inside .then: ", response);
            res.status(200).json(response);
        })
        .catch(err => {
		res.status(400).json({ error: err.message });
        })
});


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to delete user", error });
        })

});




module.exports = router;
