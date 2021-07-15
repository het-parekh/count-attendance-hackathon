const mongoose = require('mongoose');

const info_tableSchema = new mongoose.Schema({
    REGION_NAME:{type: String },
    BRANCHES:[{
        BRANCH_NAME:{type :String},
        HUBS:[{
            HUBNAME:{type:String}
        }]

    }]
});

const info_table = mongoose.model('info_table',info_tableSchema);
module.exports  = info_table;