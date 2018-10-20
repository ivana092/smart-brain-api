const handleProfile=(req,res,db)=>{
	const {id} = req.params;
	let found = false;
	db.select('*').from('users').where({
		id:id
	})
	.then(user =>
		/*To check if value returned is empty*/
		{  if(user.length){
			res.json(user[0]);
		}
		else{
			res.status(400).json('User Not found!!');
		}
	})
	.catch(err => res.status(400).json('Error getting user!!'))
}

module.exports = {
	handleProfile: handleProfile
};