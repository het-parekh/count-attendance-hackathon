const invoice = require('../models/invoice.model');

const router=require('express').Router();

router.post('/',async (req,res)=>{
    const {  Manpower_Names, Hours_per_day, Activity, Hub, Branch, Region, Vendor} = req.body;
    console.log(Manpower_Names, Hours_per_day, Activity, Hub, Branch, Region, Vendor)
    if(Manpower_Names.length<0 || typeof Hub==='undefined' || typeof Branch==='undefined' || typeof Region==='undefined' || typeof Activity ==='undefined'
      || Hub==='' || Branch==='' || Region==='' || Activity==='' || Vendor===''){
       return res.status(403).send({"error":"please provide all the information"});
    }
    try {
        let new_invoice= invoice();
           new_invoice.Manpower_Names=Manpower_Names,
           new_invoice.Hub=Hub.trim(), 
           new_invoice.Branch=Branch.trim(),
           new_invoice.Region=Region.trim(),
           new_invoice.Hours_per_day=Hours_per_day.trim(),
           new_invoice.Activity=Activity.trim()
           new_invoice.Vendor=Vendor.trim()

        let result= await new_invoice.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/', async(req,res)=>{
    try {
        let result= await invoice.find().populate('Vendor');
        return res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;