const vendor = require('../models/vendor.model');

const router=require('express').Router();

router.post('/',async (req,res)=>{
    var { vendor_name, vendor_id, invoice, region}= req.body;
    if(typeof vendor_name==='undefined' || typeof vendor_id==='undefined' || typeof invoice==='undefined' || typeof region==='undefined'
      ||  vendor_id==='' || vendor_name==='' || invoice==='' || region===''){
       return res.status(403).send({"error":"please provide all the information"});
    }
    try {
        var new_vendor= vendor()
        new_vendor.vendor_name=vendor_name.trim();
        new_vendor.vendor_id=vendor_id.trim();
        new_vendor.invoice=invoice.trim();
        new_vendor.region=region.trim();
        let result= await new_vendor.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;