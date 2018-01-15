const mongoose = require('mongoose');
const {Schema} = mongoose; //same as: const Schema = mongoose.Schema

const userSchema = new Schema ({ //defines a user
	googleId: String,
	credits: { type: Number, default: 0 } //type of object with its default value
});

//create a new collection called "users"
mongoose.model('users', userSchema);