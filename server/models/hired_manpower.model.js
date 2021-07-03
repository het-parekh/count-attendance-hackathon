const mongoose = require('mongoose');

const hiredmanpowerSchema = new mongoose.Schema({
	first_name : { type: String, default: null },
	last_name : { type: String, default: null } , 
	catagory : { type: String, default: null},
	gender : { type: String, default:"Male" }

});

const hiredmanpower = mongoose.model('hiredmanpower',hiredmanpowerSchema);
module.exports  = hiredmanpower