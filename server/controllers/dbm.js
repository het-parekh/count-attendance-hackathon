const mongoose = require("mongoose");
const tokens = require("../models/blacklistedtoken");
const User = require("../models/user.model");
const bcrypt =require('bcrypt');
const crypto = require('crypto');
const sendmail = require('./sendMail');
const passwordschema = require('./passwordvalidator');
mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	
},
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to database");
/* 			info_tableSchema.insertMany([
				{
                first_name : "Gojo",
                last_name : "Satoru" , 
                catagory : 'Driver',
                gender : 'Male',
                No_hours:12,
                OT_hours:24,
                dist_travelled:100
                },
                {
                    first_name : "Yuji",
                    last_name : "Itadori" , 
                    catagory : 'GunMan',
                    gender : 'Male',
                    No_hours:2,
                    OT_hours:14,
                    dist_travelled:10
                    },
                    {
                        first_name : "Nobara",
                        last_name : "Kugisaki" , 
                        catagory : 'Vehical',
                        gender : 'FeMale',
                        No_hours:22,
                        OT_hours:2,
                        dist_travelled:50
                        },{
                            first_name : "Naruto",
                            last_name : "Uzumaki" , 
                            catagory : 'Driver',
                            gender : 'Male',
                            No_hours:12,
                            OT_hours:24,
                            dist_travelled:100
                            },
                            {
                                first_name : "kakasi",
                                last_name : "Hatake" , 
                                catagory : 'GunMan',
                                gender : 'Male',
                                No_hours:2,
                                OT_hours:14,
                                dist_travelled:10
                                },
                                {
                                    first_name : "Itachi",
                                    last_name : "Uchiha" , 
                                    catagory : 'Vehical',
                                    gender : 'FeMale',
                                    No_hours:22,
                                    OT_hours:2,
                                    dist_travelled:50
                                    }
			]).then(function(){
				console.log("Data inserted")  // Success
			}).catch(function(error){
				console.log(error)      // Failure
			});
 */
/* 						s= info_table({
							"REGION_NAME":"Maharastra",
                            "BRANCHES":[{
                                "BRANCH_NAME":"Mumbai",
                                "HUBS":[{
                                    "HUBNAME":"vileparle"
                                },
                                {
                                    "HUBNAME":"Andheri"
                                },
                                {
                                    "HUBNAME":"Sion"
                                }]

                            }]

						});
						s.save(function(err){
							console.log(err);
						}) */
		}
	}
);

async function forgetPassword(email) {
	user = await User.findOne({ email: email });
	if (user == null) throw "a user with that email doesn't exist";
	else {
		let token = crypto.randomBytes(16).toString("hex");
		user.resetPasswordToken = token;
		user.resetPasswordExpires = new Date();
		user.save(function (err) {
			if (err) console.log(err);
		});
		data = {
			email: user.email,
			link: process.env.FRONTEND + "/resetPassword/" + token
		};
		sendmail(data, "forgetPassword");
		console.log(data);
		return "details to reset password has been mailed to this email please check your inbox";
	}
}

async function resetPassword(token, newPassword) {
	user = await User.findOne({ resetPasswordToken: token });
	if (user == null) throw "invalid Token";
	now = new Date();
	if (now - user.resetPasswordExpires > 10 * 60 * 1000) throw "token Expired";
	istrue = await passwordschema.validate(newPassword, { list: true });
	console.log(istrue);
	if (istrue.length > 0) {
		msg = []
		istrue.forEach(element => {
			if (element === "min") msg.push("password must contain min 8 characters")
			if (element === "max") msg.push("password must be less then 100 characters")
			if (element === "uppercase") msg.push("password must have uppercase latters")
			if (element === "lowercase") msg.push("password must have lowercase latters")
			if (element === "digits") msg.push("password must contain atleast 1 number")
			if (element === "spaces") msg.push("password Should not have spaces")
		});
		throw msg;
	}
	const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
	user.password = hash;
	user.resetPasswordToken = null;
	user.resetPasswordExpires = null;
	await user.save();
	return "password changed succsessfully";
}

async function addNewUserToDatabase(val){
    var user=User();
    const password=val.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.first_name=val.first_name.trim();
    user.last_name=val.last_name.trim();
    user.email=val.email.trim();
    user.password=hash;
    user.role= typeof val.type!="undefined" ? val.role:"User";
    user.hub=val.hub.trim();
    user.branch=val.branch.trim();
    user.region=val.region.trim();
    

try {
    return await user.save();	
} catch (error) {
    throw error;
    }
}

async function DeleteById(model,Id){
	try {
		deleted=await model.deleteMany({ _id:{ $in:Id}});
		return deleted
	} catch (error) {
		console.log(error);
		throw error;
	}
}

function makePassword(length) {
	var result = "";
	var characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function blaclist_Tokens(Iat,token){
    var newlist=tokens();
    newlist.token=token;
    newlist.createdAt=new Date(Iat*1000).constructor();
    newlist.save();
}

module.exports= {
	forgetPassword:forgetPassword,
	resetPassword:resetPassword,
    addNewUserToDatabase:addNewUserToDatabase,
    DeleteById:DeleteById,
    blaclist_Tokens:blaclist_Tokens
};