const info_table = require('../models/info.model');

const router=require('express').Router();

router.get('/',async (req,res)=>{
    try {
        let result= await info_table.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;