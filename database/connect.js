const mongoose=require('mongoose');
//mongoose.connect('mongodb://192.168.16.2:27017/veracruz');
//mongodb+srv://veracruz:<password>@cluster0-rwbkh.mongodb.net/test
mongoose.connect('mongodb+srv://veracruz:<veracruz>@cluster0-rwbkh.mongodb.net/test').then(()=>{
  console.log('conectado a cloud mongodb');
}).catch(()=>{
  console.log('error al conectar mongodb');
});
mongoose.set('useFindAndModify', false);

module.exports=mongoose;
