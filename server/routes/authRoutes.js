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
		passport.authenticate('google'), //passes on handler to below
		(req, res) => {
			// console.log("get: callback");
			/*
				After user auths with google, reroute/enter the application
			*/
			res.redirect('/surveys');
		}
	);	

	/*
		Test if someone has logged in + authenticated, can get access to user
		If not, returns some null object
	*/	
	app.get('/api/current_user', (req, res) => {
		// console.log("get: current_user");
		res.send(req.user);
	});

	/*
		For logging out
	*/
	app.get('/api/logout', (req, res) =>{
		// console.log("get; api/logout");
		req.logout();
		res.redirect('/');
	});
}