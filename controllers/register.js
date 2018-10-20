const handleRegister=(req,res,bcrypt,db)=>{
	const {name, email, password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json('Fields missing');
	}
	const hash = bcrypt.hashSync(password);
	
	db.transaction(trx=>{
		trx.insert(
			{hash : hash,
				email : email
			}
			)
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({
				name : name,
				email : loginEmail[0],
				/*password : password,*/
				joined : new Date()
			})
			.then(user=> res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})

	.catch(err => res.status(400).json('Unable to register due to incorrect values passed'));
 /*database.users.push(
	{
		id: '124',
		name : name,
		email : email,
		password : password,
		entries : 0,
		joined : new Date()
	})*/
	//res.json(database.users[database.users.length-1]);
}

module.exports = {
	handleRegister: handleRegister
};