/*
	require credits middleware
*/
module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		//not enough credits
		return res.status(403).send({error: 'Not enough credits' });
	}

	//user has enough credits
	next();
}