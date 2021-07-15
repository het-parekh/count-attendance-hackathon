const mongoose = require('mongoose');

const vendor_Schema= new mongoose.Schema({
        vendor_name:{type:String},	
    	region:{type:String},
		sla:{gunman:{type:Number},driver:{type:Number},vehicle:{type:Number}}		
});

const vendor = mongoose.model('vendor',vendor_Schema);
module.exports  = vendor;