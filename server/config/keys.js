//figure out which set of credentials to return - dev or production
if (process.env.NODE_ENV === 'production') {
	// console.log("keys: in production");
	// in production
	module.exports = require('./prod');
} else {
	// console.log("keys: in dev");
	//in development
	module.exports = require('./dev');
}