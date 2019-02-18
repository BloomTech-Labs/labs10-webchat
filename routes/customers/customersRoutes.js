const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");

if(process.env.NODE_ENV !== 'production'){
 require('dotenv').load();
}


// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");

const db = require('../../data/helpers/customersDb');


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  };
  firebase.initializeApp(config);    //initialize firebase by passing config variables

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


//Test code - to understand how firebase is implemented  before integrating with adding a new user

/*router.post('/register', (req, res) => {
	let {email, password} = req.body 

	auth.createUserWithEmailAndPassword(email, password)    //firebase auth function to register a new user, requires email and password, just 2 fields, stores them in firebase databse
	.then(response_data =>{
		
		console.log(response_data);
		res.status(200).json(response_data);    //response_data conatins the new user's registration details dent back by firebase
	
	})
	.catch(err => {
	  	// Handle Errors here.
		let errorCode = err.code;
  		let errorMessage = err.message;

  	  	res.status(500).json(errorMessage);
	})

});*/


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


router.post('/register', (req, res) => {         	// POST to '/api/customers/register'
    let { name, email, password, summary } = req.body;
    
   //checking for missing values
	
    if (!name) {
        res.status(400).json({message: 'Please provide your name.'});
        return;
    }
    if (!email) {
        res.status(400).json({message: 'Please provide an email address.'});
        return;
    }

    if (!password) {
        res.status(400).json({message: 'Please provide a password.'});
        return;
    }	
    if (!summary) {
        res.status(400).json({message: 'Please provide a summary of your inquiry.'});
        return;
    }
	
	let newCustomer = { name, email, summary };
    	
	auth.createUserWithEmailAndPassword(email, password) //firebase auth function to register a new user, requires email and password fields only, stores the details in firebase databse 
        .then(response_data =>{

        	console.log(response_data);  //response_data conatins the new user's registration details sent back by firebase
		console.log(newCustomer);

		const request = db.insert(newCustomer);
        	
		request.then(customer => {
           		 
            		console.log("customer inside db insert then: ", customer);

            		res.status(200).json(customer);
        	})	
        	.catch(err => {
                        res.status(400).json(err.message);
            	})
        })
        .catch(err => {
         	
		// Handle Errors here.
                let errorCode = err.code;
                let errorMessage = err.message;

                res.status(500).json(errorMessage);
         })

});


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to delete user"});
        })

});

module.exports = router;
