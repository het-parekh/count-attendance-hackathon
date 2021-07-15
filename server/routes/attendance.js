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
            await attendance.updateOne(
                { date: new Date().toJSON().slice(0, 10) },
                { $push: { attendances: { $each: attendtoday } } }
            );
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

router.get('/all', async (req, res) => {
    try {
        all_attendance = await attendance.find().populate('attendances.manpower');
        res.status(200).send(all_attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});

router.get('/:date', async (req, res) => {
    var date = req.params.date;
    try {
        attendance_day = await attendance.find({ date: date }).populate('attendances.manpower');
        res.status(200).send(attendance_day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});

router.post('/:id', async (req, res) => {
    var id = req.params.id;
    var prev_date = req.body.date;
    console.log(id, prev_date, req.body.OT_hours, 'wht is this')
    const query = { date: prev_date, "attendances.manpower": id };
    const updateDocument = {
        $set: { "attendances.$.OT_hours": req.body.OT_hours }
    };
    try {
        attendance_day= await attendance.update(query,updateDocument);  
        res.status(200).send(attendance_day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "attendance": error });
    }
});
module.exports = router;