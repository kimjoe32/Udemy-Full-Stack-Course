const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser= require('body-parser');

require('./models/User');//don't need to assign to a variable because no direct calls
require('./services/passport');

//connects to mongodb database
mongoose.connect(keys.mongoURI, {useMongoClient: true,});
mongoose.Promise = global.Promise;

const app = express();

//for parsing bodies - when a req comes in, parse it and assign to req.body
app.use(bodyParser.json());

//tell express it needs to make use of cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 *1000, //how long cookie can exist in browser - 30 days
		keys: [keys.cookieKey]//to encrypt cookie
	})
);

//tell passport to use cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

/*
	middlewares - every packet is inspected and possibly modified
	    - authRoutes - for authentication
	    - billingRoutes - for billing
*/
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


/* 
	Only runs in heroku production
*/
if (process.env.NODE_ENV === 'production') {
	// make sure express will serve production assets
	// like main.js file, or main.css file
	const path = require('path');
	app.use(express.static(path.join(__dirname, 'client/build')));

	// express will serve index.html file if it doesn't recognize route
	// catchall case - if all previous attempts have failed
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);