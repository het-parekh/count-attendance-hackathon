const mongoose = require("mongoose");
const info_table = require("../models/info.model");
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
