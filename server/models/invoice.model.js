const mongoose = require('mongoose');

const invoice_Schema= new mongoose.Schema({
    Manpower_Names:[{type:String}],
   	Designation:{type:String},
   	HUB:{type:String},	
   	BRANCH:	{type:String},
   	REGION:{type:String},
    Hours_per_day:{type:Number},			
   	Activity:{type:String}
            
});

const invoice = mongoose.model('invoice',invoice_Schema);
module.exports  = invoice;