const vendor = require('../models/vendor.model');

const router = require('express').Router();

router.get('/', async (req,res) => {
    try {
        let result= await vendor.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/',async (req,res)=>{
    var { vendor_name, region, sla, sla_ot}= req.body;
    if(typeof vendor_name==='undefined' || typeof region==='undefined'
     || vendor_name==='' || region==='' || sla === ""){
       return res.status(403).send({"error":"please provide all the information"});
    }
    try {
        console.log(sla, sla_ot)
        var new_vendor= vendor()
        new_vendor.vendor_name=vendor_name.trim();
        new_vendor.region=region.trim();
        
        new_vendor.sla.gunman=sla.gunman;
        new_vendor.sla.driver=sla.driver;
        new_vendor.sla.vehicle=sla.vehicle;
        
        new_vendor.sla_ot.gunman=sla_ot.gunman;
        new_vendor.sla_ot.driver=sla_ot.driver;
        new_vendor.sla_ot.vehicle=sla_ot.vehicle;
        
        let result= await new_vendor.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;