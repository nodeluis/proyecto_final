const mongoose=require('mongoose');
//mongoose.connect('mongodb://192.168.16.2:27017/veracruz');
mongoose.connect('mongodb+srv://veracruz:veracruz@cluster0-rwbkh.mongodb.net/test');
mongoose.set('useFindAndModify', false);

module.exports=mongoose;
