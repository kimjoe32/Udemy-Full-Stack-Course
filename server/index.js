const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./config/keys");
const app = express();

const PORT = process.env.PORT || 5000;

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
			//
			console.log("accessToken: " + accessToken);
			console.log("refreshToken: " + refreshToken);
			console.log("profile: " + JSON.stringify(profile));
		}
	)
); 

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
	Route handler for callback (after use logs in) to authenticate
*/
app.get(
	'/auth/google/callback', 
	passport.authenticate('google')
);	

app.listen(PORT);