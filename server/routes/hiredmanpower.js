const hiredmanpower = require('../models/hired_manpower.model');

const router=require('express').Router();

router.get('/',async (req,res)=>{
    try {
        manpower= await hiredmanpower.find();
        res.status(200).send(manpower);
    } catch (error) {
        console.log(error);
        res.status(500).json({"manpower":error});
    }
});

module.exports=router;