const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
	attendances:[{
               manpower:{
                    type:mongoose.Types.ObjectId, ref:'hiredmanpower'
                     },
                No_hours:{type:Number, default:0},
                dist_travelled:{type:Number, default:0},
                OT_hours:{type:Number, default:0}
                }],
    date:{type:String, default: new Date().toJSON().slice(0,10)}
},
    {
        timestamps: true
    }
);

const attendance = mongoose.model('attendance',attendanceSchema);
module.exports  = attendance