const invoice = require('../models/invoice.model');

const router=require('express').Router();

router.post('/',async (req,res)=>{
    var {  Manpower_Names,Designation,HUB,BRANCH,REGION,Hours_per_day,Activity}= req.body;
    if(Manpower_Names.length<0 || typeof Designation==='undefined' || typeof HUB==='undefined' || typeof BRANCH==='undefined' || typeof REGION==='undefined' || typeof Activity ==='undefined'
      ||  Designation==='' || HUB==='' || BRANCH==='' || REGION==='' || Activity===''){
       return res.status(403).send({"error":"please provide all the information"});
    }
    try {
        let new_invoice= invoice();
           new_invoice.Manpower_Names=Manpower_Names,
           new_invoice.Designation=Designation.trim(),
           new_invoice.HUB=HUB.trim(), 
           new_invoice.BRANCH=BRANCH.trim(),
           new_invoice.REGION=REGION.trim(),
           new_invoice.Hours_per_day=Hours_per_day,
           new_invoice.Activity=Activity.trim()
        let result= await new_invoice.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/', async(req,res)=>{
    try {
        let result= await invoice.find();
        return res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;