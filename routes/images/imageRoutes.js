const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/imageDb');
const dbrep = require('../../data/helpers/repDb');
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
                .then(images => {
                        res.status(200).json(images);
                })
                .catch(err => {
                        res.status(500).json(err.message);
                })
});


router.get('/:id', (req, res) => {
	console.log('req.params.id is:', req.params.id);
        const id = req.params.id;
        console.log('image id on server is', id);

        const request = db.getById(id);
        request.then(response_data => { 
                console.log(response_data);

                if(response_data.length == 0) {
                        res.status(400).json({ error: "The image with the specified id does not exist" });
                } else {
                        console.log(response_data);
                        res.status(200).json(response_data);
                }
        })
        .catch(err => {
                res.status(500).json({ err: err.message });
        })
});


router.post('/', (req, res) => {
        const url = req.body.url;

        console.log(url);

        if (!url) {
                res.status(400).json({ message: 'Please provide image url' });
                return;
        }

        let image = {url: url};
        const request = db.insert(image);

                request.then(image => {
                        console.log('image id is', image);
                        res.status(200).json(image);
                })
                .catch(err => {
                        res.status(500).json({ err: err.message});
                })
});

router.put('/:id', upload.single('file'), (req, res) => {

 	console.log('Inside image update endpoint');

	const id  = req.params.id;   //id is image id
	const uid = req.body.uid;

	console.log('uid is', uid);

	//console.log('req.file is', req.file);
	
	//delete cached rep data to update the new image
	client.del(req.body.uid, (error, result)=> {
        	if(error){
                        console.log(error);
                        res.status(500).json({error: error});
                        return;
                }

                if(result){
                        console.log('client.del result is', result);
                }
        })



	cloudinary.uploader.upload(req.file.path,(result) =>{
                //console.log('cloudinary result', result);

                imgUrl = result.secure_url;
        }).then(() =>{

                console.log('image url', imgUrl);
                const image = {url:imgUrl};
	

	if(Number(id) == 1){                            //default image id for users who haven't uploaded any images
				

		const request = db.insert(image);   //create  a new record in the images table

		request.then(response => {
                        console.log('inside image db insert then, response is', response);
						
			let updateRepresentative = { image_id: response };
			
			const req_rep = dbrep.updateByUid(uid, updateRepresentative);  //update the new image_id in rep table

                        req_rep.then(representative => {
                                console.log(representative);
                                res.status(200).json(image);
                        })
                        .catch(err => {
                                console.log(err.message);
                                res.status(500).json({message: err.message});
                        })

        	})
        	.catch(error => {
        		res.status(500).json({error: error.message});
        	})
	}
	else{
		
		const request = db.update(id, image);
                        
                        request.then(res_image => {
                                console.log(res_image);
				res.status(200).json(image);
                        })
                        .catch(err => {
                                console.log(err.message);
                                res.status(500).json({message: err.message});
                        })
		}

	})
});	


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
