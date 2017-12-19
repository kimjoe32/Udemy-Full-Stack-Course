const passport = require('passport');
module.exports = app => {
	/* 
		Route handler for logging in to authenticate
	*/
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	/*
		Route handler for callback (after user logs in) to authenticate
	*/
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google')
	);	

	/*
		Test if someone has logged in + authenticated, can get access to user
	*/	
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	/*
		For logging out
	*/
	app.get('/api/logout', (req, res) =>{
		req.logout();
		res.send(req.user); //proves to user they are no longer signed in
	});
}