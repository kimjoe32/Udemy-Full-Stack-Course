/*
	require login middleware
*/
module.exports = (req, res, next) => {
	if (!req.user) {
		//if no user, error
		return res.status(401).send({error: 'you must login'});
	}

	//user is logged in
	next();
}