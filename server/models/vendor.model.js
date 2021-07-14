const mongoose = require('mongoose');

const vendor_Schema= new mongoose.Schema({
        vendor_name:{type:String},	
    	vendor_id:{type:String},	
    	invoice:[{type:mongoose.Schema.Types.ObjectId, ref: 'invoice'}],
    	region:{type:String}		
});

const vendor = mongoose.model('vendor',vendor_Schema);
module.exports  = vendor;