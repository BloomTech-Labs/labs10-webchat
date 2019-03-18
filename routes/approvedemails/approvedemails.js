const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/approvedemailDb');
const sgMail = require('@sendgrid/mail');

if (process.env.ENVIRONMENT == 'development') {
  require('dotenv').config();
}


//sengrid 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.get('/', (req, res) => {
        	const request = db.get();
                
		request.then(approvedemails => {
                        res.status(200).json(approvedemails);
                })
                .catch(err => {
                        res.status(500).json({err: err.message});
                })
});

router.get('/:id', (req, res) => {
        const id = req.params.id;
        const request = db.getById(id);

        request.then(response_data => { 
                console.log(response_data);

                if(response_data.length == 0) {
                        res.status(400).json({ error: "The user  with the specified id does not exist" });
                } else {
                        console.log(response_data);
                        res.status(200).json(response_data);
                }
        })
        .catch(err => {
                res.status(500).json({ err: err.message });
        });
})


router.post('/', (req, res) => {
        const {email, company_id} = req.body;
        const user = {email, company_id};
        console.log("POST to /approvedemails, user: ", user);
        const request = db.insert(user);

        request.then(response =>{
        //after the email is added to approved email table, an email is sent to the team member using sendgrid
                console.log("email inserted into approved_emails");
                const msg = {
                        to: email,
                        from: 'webchat@test.com',
                        subject: 'Added as a team member by admin',
                        text: 'You have been  added to as a team member',
                        html: '<strong>Welcome to the team, go ahead and create an account at this link https://labs10-webchat.netlify.com</strong>',
                };
		
		//using sendgrid to send the email
                sgMail.send(msg);
                console.log('success sending email');
                res.status(200).json(response);
        })
        .catch(error =>{
                res.status(500).json({message: error.message});
        })
});

router.post('/verifyemail', (req, res) => {
	console.log("verifyemail endpoint hit");
	const { email } = req.body;
	const request = db.getByEmail(email);
	request.then(response_data => {
		console.log("verifyemail response: ", response_data);
		if (response_data) {
			res.status(200).json(response_data.company_id);
		} else {
			res.status(400).json({ message: "Not an approved email. Register a new company or check with admin of existing company." });
		}
	});

})


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: error.message });
        })

});

module.exports = router;
