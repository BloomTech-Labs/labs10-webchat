const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/repDb');
const compdb = require('../../data/helpers/companiesDb');

router.get('/', (req, res) => {
	db.get()
		.then(reps => {
			res.status(200).json(reps);
		})
		.catch(err => {
			res.status(500).json(err);
		})
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	
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

router.post('/', (req, res) => {

	let {companyname, motto, phone_number, email, image_id, is_admin, uid} = req.body;
	let repname = req.body.name;

	console.log(companyname);

	if (!repname) {
		res.status(400).json({message: 'Please provide your name.'});
		return;
	}
	if (!email) {
		res.status(400).json({message: 'Please provide an email address.'});
		return;
	}
	if (!companyname) {
                res.status(400).json({message: 'Please provide an email address.'});
                return;
        }
	if (!image_id) {
		image_id = 1;
	}
	//if (!company_id) {
	//	res.status(400).json({message: 'No company id, rep must be member of existing company.'});
	//	return;
	//}
	

	let api_token = req.body.companyname;
	let newCompany = {name: companyname, api_token: api_token};
	
	const comp_req = compdb.insert(newCompany);

	comp_req.then(id_company => {
                        console.log(id_company);   
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


	
	//let newRepresentative = { company_id, name, motto, phone_number, email, image_id };
	
	//const request = db.insert(newRepresentative);

	//	request.then(representative => {
	//		console.log(representative);
	//		res.status(200).json(representative);
	//	})
		//.catch(err => {
		//	const request = db.getByEmail(email);
		//	request.then(response_data => {
		//		console.log(response_data);
		//		if (response_data) {
		//			res.status(400).json({ error: 'The provided email is already associated with an account' });
		//		}
		//	});
	//	});
});


/*let table = 'representatives';
                        const request = db.getByEmail(email, table);
                        request.then(response_data => {
                                console.log(response_data);
                                if (response_data) {
                                        res.status(400).json({ error: 'The provided email is already associated with an account' });
                                }
                        });
                });*/



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
	const { email } = req.body;
	const table = 'approved_emails';
	const request = db.getByEmail(email, table);
	request.then(response_data => {
		console.log(response_data);
		if (response_data) {
			res.status(200).json(response_data.company_id);
		} else {
			res.status(400).json({ error: 'You are not approved to join this company.' });
		}
	});

})


module.exports = router;
