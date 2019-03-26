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

let redis_url = process.env.REDIS_URL;

if (process.env.ENVIRONMENT == 'development') {
  require('dotenv').config();
  redis_url = "redis://127.0.0.1";	
}


//redis setup
let client = require('redis').createClient(redis_url);
let Redis = require('ioredis');
let redis = new Redis(redis_url);

//cloudinary setup
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
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
	const uid  = req.body.uid;
	console.log('uid is', uid);
	
	
		const request = db.getByUid(uid);
        	
		request.then(response_data => { 
                	//console.log(response_data);

                	if(response_data.length == 0) {
                        	res.status(400).json({ error: "The representative with the specified id does not exist" });
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


router.get('/alldetails', (req,res) => {
	const uid = req.body.uid;
	console.log('uid inside alldetails is:', uid);


	client.get(uid, (error, rep)=> {
                if(error){
                        console.log(error);
                        res.status(500).json({error: error});
                        return;
                }

                if(rep){
                        console.log('response from redis client.get', JSON.parse(rep));   //JSON objects need to be parsed after reading from redis since it is stringified before storing into redis cache
                        res.status(200).json(JSON.parse(rep));

                }
                else{
		const request = db.getDetails(uid);

                request.then(response_data => {

                        if(response_data.length == 0) {
                                res.status(400).json({ error: "The representative with the specified uid does not exist" });
                        }
                        else {
                                //console.log(response_data);
                                res.status(200).json(response_data);

                //if the requested rep with the specified uid is not present in redis, client.set() stores the rep details in redis using the uid as key and the rep details as the value associated with the key, it is stringified before being stored in redis 

                client.set(uid, JSON.stringify(response_data),(error, result)=> {
                if(error){
                         console.log(error);
                         res.status(500).json({ error: error});
                        }
                else{
			console.log('after client.set result is', result);
		}

		})
                }

                })
                .catch(err => {
                        res.status(500).json({ err: err.message });
                })

        }
})

});



router.get('/company/:id', (req, res)=>{
	const company_id = req.params.id;
	const uid = req.body.uid;
        console.log('company_id is', company_id);

        const request = db.getByCompanyId(company_id, uid);
	
	request.then(response => {
                console.log('all the reps that belong to a company', response);
		res.status(200).json(response);
        })
        .catch(error => {
        	res.status(500).json(error.message);
        })
});


router.get('/allreps', (req,res) =>{	
	const uid = req.body.uid;
	console.log('uid is', uid);

	const request = db.getByUid(uid);

	request.then(response => {
                       
		let company_id = response.company_id;
		console.log('company_id', company_id);

			const repsall_req = db.getByCompanyId(company_id, uid);	
			
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

router.put('/updaterepinfo', (req, res) => {
	const uid = req.body.uid;
	const user = {
		name: req.body.name,
		phone_number: req.body.phone_number,
		motto: req.body.motto,
		email: req.body.email,
	};
	
	
	const request = db.updaterepinfo(uid, user);

	request.then(response => {
		client.del(uid, (error, result)=> {
                if(error){
                        console.log(error);
                        res.status(500).json({error: error});
                        return;
                }

                if(result){
                        console.log('after client.del result is', result);
                	res.status(200).json(user); //after successfull update sending the updated user info back to display on accout settings page      
        	}
		})		
	})
	.catch(error => {
                console.log(error.message);
                res.status(500).json({ error: "Failed to update rep information" });
        })
});	


//update a representative's admin status

router.put('/adminstatus/:id', (req, res) => {
        const id = req.params.id;
	const uid = req.body.uid;
        const is_admin = req.body.is_admin;
        const user = {is_admin};

        console.log('uid is', uid);

        const request= db.update(id, user);

        request.then(response_data => {
		client.del(uid, (error, result)=> {
                if(error){
                        console.log('error in client.del is', error);
                        res.status(500).json({error: error});
                        return;
                }
                
                if(result){
                        console.log('after client.del result is', result);
                        res.status(200).json(response_data);      
                }
                })
        })
        .catch(error => {
                res.status(500).json({error: "Failed to update admin status"});
        })

});


router.delete('/:id', (req, res) => {
	const {id} = req.params;
	const uid = req.body.uid;

	const request = db.remove(id);

	request.then(response_data => {
                client.del(uid, (error, result)=> {
                
		if(error){
                        console.log('error in client.del is', error);
                        res.status(500).json({error: error});
                        return;
                }
                if(result){
                        console.log('after client.del result is', result);
                        res.status(200).json(response_data);
                }
                })
        })
	.catch(error => {
    		res.status(500).json({error: "Failed to delete user"});
  	})
});



router.post('/nonadmin', upload.single('file'),(req, res) => {

	let { name, email, company_id, uid, motto, phone_number } = req.body;
	if (!req.file) {
		let image_id = 1;
		let newRep = {
			name: name,
			email: email, 
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
