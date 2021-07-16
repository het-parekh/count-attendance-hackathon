const bill = require('../models/bill.model');

const router = require('express').Router();

router.get('/all', async (req,res) => {
    try {
        let result= await bill.find().populate('Vendor_ref').populate('invoice');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/all', async (req,res) => {
    try {
        let result= await bill.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});


module.exports=router;