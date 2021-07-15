const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name : { type: String, default: null },
	last_name : { type: String, default: null } , 
	email : { type: String, default: null ,index: { unique: true }},
	role:{type: String, default: 'User'},
	password:{type: String},
	hub:{type: String, default: null},
	branch:{type: String, default: null},
	region:{type: String, default: null}

});

const User = mongoose.model('User',UserSchema);
module.exports  = User