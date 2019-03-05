const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/repDb');
const compdb = require('../../data/helpers/companiesDb');
const dbimg = require('../../data/helpers/imageDb');
const dbapp = require('../../data/helpers/approvedemailDb');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/files/' });
const fs = require('fs');
const cloudinary = require('cloudinary');

if (process.env.ENVIRONMENT == 'development') {
  require('dotenv').config();
}


//redis setup
var client = require('redis').createClient(process.env.REDIS_URL);
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);


cloudinary.config({ 
  cloud_name:"dvgfmipda",
  api_key:"682433638449357",
  api_secret:"XCwRt4rmt3a6-Jc06bzwSRhv3ns"
});


router.get('/', (req, res) => {
	db.get()
		.then(reps => {
			res.status(200).json(reps);
		})
		.catch(err => {
			res.status(500).json(err);
		})
});

router.get('/getbyUID', (req, res) => {
	console.log(req.body.uid);
	const uid  = req.body.uid;
	console.log('uid is', uid);
	
	
	//using redis to cache representative details using uid, if a rep with incoming uid is present in redis storage, it will be read from redis instead of database to improve performance  
	client.get(req.body.uid, (error, rep)=> {
		if(error){
			console.log(error);
			res.status(500).json({error: error});
			return;
		}

		if(rep){
			console.log('inside client.get', JSON.parse(rep));   //redis stores values as key and value, does not store JSON objects, hence JSON objects need to be parsed after reading from redis since it is stringified while storing in redis
			res.status(200).json(JSON.parse(rep));
		
		}
		else{
		const request = db.getByUid(uid);
        	
		request.then(response_data => { 
                	console.log(response_data);

                	if(response_data.length == 0) {
                        	res.status(400).json({ error: "The representative with the specified id does not exist" });
                	} 	
			else {
                        	console.log(response_data);	
                        	res.status(200).json(response_data);

		console.log('before client.set');
		//if the requested rep with the specified uid is not present in redis, client.set() stores the rep details in redis using the uid as key and the rep details as the value associated with the key, it is stringified before being stored in redis 

		client.set(req.body.uid, JSON.stringify(response_data), function(error) {
		if(error){
			console.log(error);
			 res.status(500).json({ error: error });
			}
		});

		}
			
        	})
        	.catch(err => {
                	res.status(500).json({ err: "Failed to retrieve representative details" });
        	})

	}
})
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	console.log('id is', id);
	
	const request = db.getById(id);
	request.then(response_data => { 
		console.log(response_data);

		if(response_data.length == 0) {
			res.status(400).json({ error: "The representative with the specified id does not exist" });
		} else {
			console.log(response_data);
			res.status(200).json(response_data);
		}
	})
	.catch(err => {
		res.status(500).json({ err: "Failed to retrieve represenative details" });
	})
});

router.get('/adminpanel/:id', (req,res) => {
	const id = req.params.id;   //req.params.id is rep id
        console.log('GET req at /adminpanel/:id -- id is ', id);

	//geDetails() helper function uses inner join to join representative, companies and images table to get all the details required for admin panel from 3 different tables

	const request = db.getDetails(id);
	request.then(details => {
                       res.status(200).json(details);	
                })
                .catch(err => {
                        res.status(500).json(err.message);
                })
});



router.get('/company/:id', (req, res)=>{
	const company_id = req.params.id;         
        console.log('company_id is', company_id);

        const request = db.getByCompanyId(company_id);
	
	request.then(response => {

                console.log('all the reps that belong to a company', response);
		res.status(200).json(response);
        })
        .catch(error => {
        	res.status(500).json(error.message);
        })
});


router.get('/allreps/:id', (req,res) =>{
	const id = req.params.id;           //later modify it to get by uid if required
	console.log('rep_id is', id);

        const request = db.getById(id);

	request.then(response => {
                       
		let company_id = response.company_id;
		console.log('company_id', company_id);

			const repsall_req = db.getByCompanyId(company_id);	
			
			repsall_req.then(response_data => {
				console.log('all the reps that belong to a company', response_data);
		
				res.status(200).json(response_data);	
			})
			.catch(error => {
                        	res.status(500).json(error.message);
                	})
                })
                .catch(err => {
                        res.status(500).json(err.message);
                })
});

router.post('/admin', upload.single('file'),(req, res) => {

	let {companyname, motto, phone_number, email, is_admin, uid} = req.body;
	let repname = req.body.name;
	let image_id=null;
        let imgUrl="";

	console.log('company name is: ', companyname);
	
	if(req.file){			// if there is an image provided by the user

	//using cloudinary to store image, cloudinary responds back with an image url which can be stored in our database	
        cloudinary.uploader.upload(req.file.path,(result) =>{
		console.log('inside cloudinary uploader');
                console.log(result);
                imgUrl = result.secure_url;
        }).then(() =>{
		
		console.log('inside cloudinary then');
        	console.log('image url', imgUrl);
        	const url = {url:imgUrl};

        	const request = dbimg.insert(url);

        	request.then(response => {
                	console.log('inside db image insert, image id is:', response);
			image_id = response;
			
			if (!image_id) {
        	      		image_id = 1;
        		}

			let api_token = req.body.companyname;
        		let newCompany = {name: companyname, api_token: api_token};

        		const comp_req = compdb.insert(newCompany);

        		comp_req.then(id_company => {
                        	console.log('company id inside company insert is: ', id_company);
                        	//res.status(200).json(id_company);

        			let company_id = id_company;
        			console.log('repname is', repname);
        			console.log('comapny_id is', company_id);

        		let newRepresentative = {
                		company_id: company_id,
                		name: repname,
                		motto: motto,
                		phone_number: phone_number,
                		email: email,
                		image_id: image_id,
                		is_admin: is_admin,
                		uid: uid
        		};

                	const request = db.insert(newRepresentative);

                	request.then(representative => {
                        	console.log(representative);
                        	res.status(200).json(representative);
                	})
                	.catch(err => {
                        	console.log(err.message);
                        	res.status(500).json({message: err.message});
                	})

        		})
        	.catch(err => {
                	console.log('company creation error message', err.message);
                	res.status(500).json({error: "Company already exists"});
        	})

        })
        .catch(error => {
        	res.status(500).json({error: "Failed to save image to the database" });
       	})

        })
	}
	else{		//if no image is provided by the user, user default image
		if (!image_id) {
                                image_id = 1;        //default image id
                        }

                        let api_token = req.body.companyname;
                        let newCompany = {name: companyname, api_token: api_token};

                        const comp_req = compdb.insert(newCompany);

                        comp_req.then(id_company => {
                                console.log('company id inside company insert is: ', id_company);

                                let company_id = id_company;
                                console.log('repname is', repname);
                                console.log('comapny_id is', company_id);

                        let newRepresentative = {
                                company_id: company_id,
                                name: repname,
                                motto: motto,
                                phone_number: phone_number,
                                email: email,
                                image_id: image_id,
                                is_admin: is_admin,
                                uid: uid
                        };

                        const request = db.insert(newRepresentative);

                        request.then(representative => {
                                console.log(representative);
                                res.status(200).json(representative);
                        })
                        .catch(err => {
                                console.log(err.message);
                                res.status(500).json({message: err.message});
                        	})

                        })
			.catch(err => {
                        console.log('company creation error message', err.message);
                        res.status(500).json({error: "Company already exists"});
                	})
	}		
});



//update a representative's admin status

router.put('/adminstatus/:id', (req, res) => {
        const id = req.params.id;

        const is_admin = req.body.is_admin;
        const user = {is_admin};

        console.log(user);
        console.log(req.body);


        const request= db.update(id, user);

        request.then(response_data => {
                res.status(200).json(response_data);
        })

        .catch(error => {
                res.status(500).json({error: "Failed to update admin status"});
        })

});


router.delete('/:id', (req, res) => {
	const {id} = req.params;

	const request = db.remove(id);

	request.then(response_data => {
		res.status(200).json(response_data);
	})

	.catch(error => {
    res.status(500).json({error: "Failed to delete user"});
  })

});


router.post('/verifyemail', (req, res) => {
	console.log("verifyemail endpoint hit");
	const { email } = req.body;
	const table = 'approved_emails';
	const request = db.getByEmail(email, table);
	request.then(response_data => {
		console.log("verifyemail response: ", response_data);
		if (response_data) {
			res.status(200).json(response_data.company_id);
		} else {
			res.status(400).json({ message: "Not an approved email. Register a new company or check with admin of existing company." });
		}
	});

})



router.post('/nonadmin', upload.single('file'),(req, res) => {

	let { name, email, company_id, uid, motto, phone_number } = req.body;
	if (!req.file) {
		let image_id = 1;
		let newRep = {
			name: name,
			email: email,  // ??? Do we need to make sure this matches their registration email?
			company_id: company_id,
			phone_number: phone_number,
			motto: motto,
			image_id: image_id,
			is_admin: false,
			uid: uid
		};

		const request = db.insert(newRep);

		request.then(rep_response => {
			console.log(rep_response);
			res.status(200).json(rep_response);
		})
		.catch(err => {  // catch error from insert new rep request
			console.log(err.message);
			res.status(500).json({message: err.message});
		})
	} else {
		let image_id = null;


		let imgUrl = "";
	
		cloudinary.uploader.upload(req.file.path,(result) =>{
			console.log('inside cloudinary uploader');
			console.log(result);
			imgUrl = result.secure_url;
		})
		.then(() => {
			console.log('inside cloudinary then');
			console.log('image url', imgUrl);
			//const image=imgUrl;
			const url = {url:imgUrl};
	
			const request = dbimg.insert(url);
	
			request.then(response => {
				console.log('inside db image insert, image id is:', response);
				//console.log('imgage id is'response);
				image_id = response;
			
				if (!image_id) {
					image_id = 1;
				}
	
				let newRep = {
					name: name,
					email: email,  // ??? Do we need to make sure this matches their registration email?
					company_id: company_id,
					phone_number: phone_number,
					motto: motto,
					image_id: image_id,
					is_admin: false,
					uid: uid
				};
	
				const request = db.insert(newRep);
	
				request.then(rep_response => {
					console.log(rep_response);
					res.status(200).json(rep_response);
				})
				.catch(err => {  // catch error from insert new rep request
					console.log(err.message);
					res.status(500).json({message: err.message});
				})
			})
			.catch(error => {     // catch error from request = dbimg.insert(url)
				res.status(500).json({error: "Failed to save image to the database" });
			})
		})   // no catch for cloudinary.uploader.upload()
	}
	
});


module.exports = router;
