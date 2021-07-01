const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
	attendance:[{type:mongoose.Types.ObjectId, ref:'hiredmanpower'}],
    date:{type:String, default: new Date().toJSON().slice(0,10)}
},
    {
        timestamps: true
    }
);

const attendance = mongoose.model('attendance',attendanceSchema);
module.exports  = attendance