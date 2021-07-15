const mongoose = require('mongoose');

const info_tableSchema = new mongoose.Schema({
    name:{type: String },
    branches:[{
        name:{type :String},
        hubs:[{
            name:{type:String}
        }]

    }]
});

const info_table = mongoose.model('info_table',info_tableSchema);
module.exports  = info_table;