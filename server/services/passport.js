const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

//don't require mongoose because it will load multiple mongoose models in different files
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// console.log("passport.serializeUser()");
	done(null, user.id); //callback to turn user into id to put into cookie
});

passport.deserializeUser((id, done) => {
	// console.log("passport.deserializeUser()");
	User.findById(id) //after we turned id back to user
		.then(user => {
			done(null, user);
		});
});

/*
	passport.use() creates generic authenticator strategy 
	In this case, use google's oauth strategy
	Create new GoogleStrategy() 
		with information:
			- googleClientID
			- googleClientSecret
			- callbackURL = return url after authentication
		with configurations:
			-  
*/
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy:true
		}, 
		async (accessToken, refreshToken, profile, done) => { 
			//runs when user gets sent back to server

			//check/query to see if user already exists - asynchronous/returns a promise
			const existingUser = await User.findOne({googleId: profile.id});
			if (existingUser) { //user exists
				// console.log("passport.userExists()");
				//tell passport we are DONE authenticating
				return done(null, existingUser);//null: no errors happened, and send existingUser
			}
			// console.log("passport.userDoesNotExist()");
			// user does NOT exist - create new user
			const user = await new User({ googleId:profile.id }).save();
			done(null, user);	//save it to the mongodb database
		}
	)
); 