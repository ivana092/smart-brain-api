const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'afd2fb0797e048c3a7a4df35efeca3f2'
});

const handleApiCalls=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    req.body.input)
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json('Error working with API!!'))
}

const handleImage=(req,res,db)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Error getting count of entries!!'))
	/*const found=database.users.filter(user=>{
		if(user.id=== id){
			user.entries++;	
			return res.json(user.entries);
		}
	});
	if(!found){
			res.status(400).json('User Not found!!');
		}*/
}

module.exports = {
	handleImage: handleImage,
	handleApiCalls : handleApiCalls
};