const mongoose = require('mongoose');

const invoice_Schema = new mongoose.Schema({
	Manpower_Names: [{ type: String }],
	Designation: { type: String },
	Hub: { type: String },
	Branch: { type: String },
	Region: { type: String },
	Hours_per_day: { type: Number },
	Activity: { type: String },
	Vendor:{type:mongoose.Schema.Types.ObjectId, ref: 'vendor'}

});

const invoice = mongoose.model('invoice', invoice_Schema);
module.exports = invoice;