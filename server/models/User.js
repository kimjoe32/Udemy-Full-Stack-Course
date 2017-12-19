const mongoose = require('mongoose');
const {Schema} = mongoose; //same as: const Schema = mongoose.Schema

const userSchema = new Schema ({ //defines a user
	googleId: String
});

//create a new collection called "users"
mongoose.model('users', userSchema);