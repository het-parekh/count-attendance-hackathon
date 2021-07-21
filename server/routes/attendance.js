const attendance = require('../models/attendance.model');

const router = require('express').Router();

router.post('/', async (req, res) => {
    var attendtoday = req.body.attendances;
    if (attendtoday.length == 0) {
        res.status(403).json({ "attendance": "attendance is missing" });
    }
    try {
        var is_attendance = await attendance.find({ date: new Date().toJSON().slice(0, 10) });
        if (is_attendance.length > 0) {
            attendtoday.forEach( async(element) => {
                let query={ date: new Date().toJSON().slice(0, 10), "attendances.invoice": element.invoice };
                let one_invoice= await attendance.find(query);
                if(one_invoice.length>0){
                    let updateDocument = {
                        "$set": { "attendances.$.OT_hours": element.OT_hours,"attendances.$.In_time": element.In_time, "attendances.$.Out_time": element.Out_time}
                    };
                      await attendance.findOneAndUpdate(query,updateDocument); 
                    
                }else{
                    
                     await attendance.findOneAndUpdate(
                        { date: new Date().toJSON().slice(0, 10) },
                        { $push: { attendances:element} }
                    );  
                }
            });
/*             await attendance.updateOne(
                { date: new Date().toJSON().slice(0, 10) },
                { $push: { attendances: { $each: attendtoday } } }
            ); */
        } else {
            save_attendance = attendance({
                attendances: attendtoday
            });
            save_attendance.save();
        }
        res.status(200).send({ "attendance": "attendance updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});

router.get('/:start/:end', async (req,res) => {
    var start=req.params.start.split('-');
    var end= req.params.end.split('-');
    try {
        let result= await attendance.find({$and:[{createdAt: {$gte: new Date(parseInt(start[0]),parseInt( start[1] )-1, parseInt(start[2]),6)}},{updatedAt: {$lte: new Date(parseInt(end[0]),parseInt( end[1] )-1, parseInt(end[2]),30)}}]})
                                    .populate({
                                        path: 'attendances.invoice',
                                        populate: {
                                            path: 'Vendor',
                                            model: 'vendor'
                                        }
                                    })
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/all', async (req, res) => {
    try {
        all_attendance = await attendance.find().populate({
            path: 'attendances.invoice',
            populate: {
                path: 'Vendor',
                model: 'vendor'
            }
        })
        res.status(200).send(all_attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});

router.get('/:date', async (req, res) => {
    var date = req.params.date;
    try {
        attendance_day = await attendance.find({ date: date }).populate('attendances.invoice');
        res.status(200).send(attendance_day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});

router.post('/:id', async (req, res) => {
    var id = req.params.id;
    var prev_date = req.body.date;
    const query = { date: prev_date, "attendances.invoice": id };
    const updateDocument = {
        $set: { "attendances.$.OT_hours": req.body.OT_hours }
    };
    try {
        attendance_day= await attendance.updateOne(query,updateDocument);  
        res.status(200).send(attendance_day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});
module.exports = router;