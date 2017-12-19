const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');//don't need to assign to a variable because no direct calls
require('./services/passport');

const PORT = process.env.PORT || 5000;

//connects to mongodb database
mongoose.connect(keys.mongoURI, {useMongoClient: true,});
mongoose.Promise = global.Promise;

const app = express();

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

require('./routes/authRoutes')(app);

app.listen(PORT);