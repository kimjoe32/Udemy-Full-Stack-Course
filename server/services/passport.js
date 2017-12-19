const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

//don't require mongoose because it will load multiple mongoose models in different files
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id); //callback to turn user into id to put into cookie
});

passport.deserializeUser((id, done) => {
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
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => { 
			//runs when user gets sent back to server

			//check/query to see if user already exists - asynchronous/returns a promise
			User.findOne({googleId: profile.id})
				.then((existingUser) => {
					if (existingUser) {
						//already have record with profile ID
						//tell passport we are DONE authenticating
						done(null, existingUser);//null: no errors happened, and send existingUser
					} else {
						//don't have user id - make new record
						//create new user with retrieved information
						new User({
							googleId:profile.id
						})
							.save()//save it to the mongodb databse
							.then(user=> done(null, user)); //return that new user was saved
					}
				});
			
		}
	)
); 