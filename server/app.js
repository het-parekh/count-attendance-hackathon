const express = require("express");
const app = express();
const user= require('./routes/user');
const db = require('./controllers/dbm');
const manpower = require('./routes/hiredmanpower');
const attendance = require('./routes/attendance');
const bill = require('./routes/bill');
const info_table= require('./routes/infotable');
const vendor=require('./routes/vendor');
const invoice=require('./routes/invoice');
const passport = require('passport');
const cors = require('cors');
require('./controllers/passportConfig');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
	origin: process.env.FRONTEND,
	credentials: true
}));

app.use(cookieParser());
app.use(passport.initialize());

app.use('/user',user);
app.use('/invoice',invoice);
app.use('/vendor',vendor);
app.use('/infotable',info_table);
app.use('/attendance', attendance);
app.use('/bill', bill);
app.use('/manpower', manpower);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server started ");
});
module.exports = app;
