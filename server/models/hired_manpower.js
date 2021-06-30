const mongoose = require('mongoose');

const hiredmanpowerSchema = new mongoose.Schema({
	first_name : { type: String, default: null },
	last_name : { type: String, default: null } , 
	catagory : { type: String, default: null},
	gender : { type: String, default:"Male" },
	No_hours:{ type:Number,  default: 0},
    OT_hours:{ type:Number,  default: 0},
    dist_travelled:{ type:Number,  default: 0}

});

const hiredmanpower = mongoose.model('hiredmanpower',hiredmanpowerSchema);
module.exports  = hiredmanpower