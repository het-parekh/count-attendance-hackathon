const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    attendances: [{
        invoice: { type: mongoose.Types.ObjectId, ref: 'invoice' },
        present_employee: [{ name: { type: String }, type: { type: String } }],
        In_time: { type: String },
        Out_time: { type: String },
        OT_hours: { type: Number, default: 0 }
    }],
    date: { type: String, default: new Date().toJSON().slice(0, 10) }
},
    {
        timestamps: true
    }
);

const attendance = mongoose.model('attendance', attendanceSchema);
module.exports = attendance