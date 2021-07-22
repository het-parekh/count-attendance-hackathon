const bill = require('../models/bill.model');

const router = require('express').Router();

router.get('/:start/:end', async (req,res) => {
    var start=req.params.start.split('-');
    var end= req.params.end.split('-');
    try {
        let result= await bill.find({$and:[{createdAt: {$gte: new Date(parseInt(start[0]),parseInt( start[1] )-1, parseInt(start[2]),6)}},{updatedAt: {$lte: new Date(parseInt(end[0]),parseInt( end[1] )-1, parseInt(end[2]),30)}}]}).populate('invoice').populate('Vendor_ref');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/previous', async (req,res) => {
    var current_month=new Date().toISOString().split('-');
    try {
        let result= await bill.find({updatedAt: {$lte: new Date(parseInt(current_month[0]),parseInt(current_month[1]-1),1)}}).populate('Vendor_ref').populate('invoice');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/all', async (req,res) => {
    var current_month=new Date().toISOString().split('-');
    try {
        let result= await bill.find().populate('Vendor_ref').populate('invoice');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});



module.exports=router;