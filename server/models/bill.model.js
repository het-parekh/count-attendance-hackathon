const mongoose = require('mongoose');

const bill_Schema= new mongoose.Schema({
        Vendor_ref:{type:mongoose.Types.ObjectId, ref:'vendor'},
    	invoice:{type:mongoose.Types.ObjectId, ref:'invoice'},
    	number_of_employees:[{
            Name:{type:String},
            amount:{type:Number}
        }],
    	service_month:{type:String},	
    	base_cost:{type:Number},		
    	extra_charges:{type:Number},	
    	total_cost:{type:Number}
        
	},
	{
		timestamps: true
	}
);

const bill = mongoose.model('bill',bill_Schema);
module.exports  = bill;