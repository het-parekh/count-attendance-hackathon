const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name : { type: String, default: null },
	last_name : { type: String, default: null } , 
	email : { type: String, default: null ,index: { unique: true }},
	password : { type: String, default: null},
	gender : { type: String, default: null },
	role:{type: String, default: 'User'},
    resetPasswordToken: { type: String, default: null},
	resetPasswordExpires: Date
});

const User = mongoose.model('User',UserSchema);
module.exports  = User