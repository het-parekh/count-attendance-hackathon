const attendance = require('../models/attendance.model');

const router=require('express').Router();

router.post('/',async (req,res)=>{
    var attendtoday=req.body.attendance;
    if(attendtoday.length==0){
        res.status(403).json({"attendance":"attendance is missing"}); 
    }
    try {
        save_attendance= attendance({
            attendance:attendtoday
        });
        save_attendance.save();
        res.status(200).send({"attendance":"todays attendance updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"attendance":error});
    }
});

router.get('/all', async(req,res)=>{
    try {
        all_attendance= await attendance.find().populate('attendance');  
        res.status(200).send(all_attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({"attendance":error});
    }
});

router.get('/:date', async(req,res)=>{
    var date=req.params.date;
    try {
        attendance_day= await attendance.find({date:date}).populate('attendance');  
        res.status(200).send(attendance_day);
    } catch (error) {
        console.log(error);
        res.status(500).json({"attendance":error});
    }
});
module.exports=router;