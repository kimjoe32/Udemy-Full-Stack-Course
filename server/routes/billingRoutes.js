const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
	/*
		handle/update user's number of credits
		this occurs after user has paid and Stripe has returned
		a token
	*/
	app.post('/api/stripe', requireLogin, async (req, res)  => {
		//create charge object
		const charge = await stripe.charges.create({
			amount: 500, //cents
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		})

		//add 5 credits to user and return the user
		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};