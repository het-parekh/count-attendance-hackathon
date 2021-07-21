const mongoose = require('mongoose');

const invoice_Schema = new mongoose.Schema({
	Manpower_Names: [{ name: { type: String }, type: { type: String } }],
	Hub: { type: String },
	Branch: { type: String },
	Region: { type: String },
	Hours_per_day: { type: Number },
	Activity: { type: String },
	Vendor: { type: mongoose.Types.ObjectId, ref: 'vendor' }

},
	{
		timestamps: true
	}
);

const invoice = mongoose.model('invoice', invoice_Schema);
module.exports = invoice;