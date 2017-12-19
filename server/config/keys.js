//figure out which set of credentials to return - dev or production
if (process.env.NODE_ENV === 'production') {
	// in production
	module.exports = require('./prod');
} else {
	//in development
	module.exports = require('./dev');
}