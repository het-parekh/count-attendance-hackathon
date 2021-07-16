const mongoose = require('mongoose');

const vendor_Schema= new mongoose.Schema({
        vendor_name:{type:String},	
    	region:{type:String},
		sla:{gunman:{type:String},driver:{type:String},vehicle:{type:String}},		
		sla_ot:{gunman:{type:String},driver:{type:String},vehicle:{type:String}}		
});

const vendor = mongoose.model('vendor',vendor_Schema);
module.exports  = vendor;