const handleSignIn=(bcrypt,db) => (req,res) => {
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(400).json('Fields missing');
	}
	db.select('email','hash').from('login')
	.where('email', '=' , email)
	.then(data =>{
		/*If email doesn't exist in DB, an empty array is returned*/
		if(data.length){
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid){
				return db.select('*').from('users')
				.where('email', '=' , email)
				.then(user =>{
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('Unable to fetch user'));
			}else{
				res.status(400).json('Username or password incorrect!!');
			}
		}
		else{
			/*empty array*/
			res.status(400).json('User Not found!!');
		}
	})
	.catch(err => res.status(400).json('Error encountered'));
	/*const {email, password} = req.body;
	const found=database.users.filter(user=>{
		if(user.email=== email && user.password === password){
			res.json(user);
		}
	})
	if(!found){
		res.status(400).json('Error login in!!');
	}*/
}

module.exports = {
	handleSignIn: handleSignIn
};