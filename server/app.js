const express = require("express");
const app = express();

const db = require('./controllers/dbm');
const manpower = require('./routes/hiredmanpower');
const attendance = require('./routes/attendance');
const info_table= require('./routes/infotable');
const venodor=require('./routes/vendor');
const invoice=require('./routes/invoice');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
	origin: process.env.FRONTEND,
	credentials: true
}));
app.use('/invoice',invoice);
app.use('/vendor',venodor);
app.use('/infotable',info_table);
app.use('/attendance', attendance);
app.use('/manpower', manpower);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server started ");
});
module.exports = app;
