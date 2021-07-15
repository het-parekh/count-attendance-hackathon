const mongoose=require('mongoose');
const tokensschema= new mongoose.Schema({
    token:String,
    createdAt: { type: Date, expires: 43200 }
});

const tokens= mongoose.model('tokens',tokensschema);

module.exports=tokens;