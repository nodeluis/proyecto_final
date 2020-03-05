const User=require('../../database/schema/user');
const express=require('express');
const sha1=require('sha1');
const empty=require('is-empty');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.get('/',(req,res)=>{
    User.find().exec((err,docs)=>{
      if(docs.length>0){
        res.status(200).json(docs);
      }else{
        res.json({
          message:'no existe users en la bd'
        });
      }
    });
});

router.post('/',async(req,res)=>{
    const datos={
      nombre:req.body.nombre,
      apellido:req.body.apellido,
      email:req.body.email,
      password:sha1(req.body.password)
    };
    const insert=new User(datos);
    const result=await insert.save();
    res.json({
      message:'usuario insertado en la bd'
    });
});

router.post('/login',(req,res)=>{
  User.findOne({
    email:req.body.email
  },(err,doc)=>{
    if(empty(doc)){
      res.json({
        message:'el email es incorrecto'
      });
    }else{
      if((sha1(req.body['password']))==doc['password']){
          const token=jwt.sign({
            email:doc.email,
            id:doc._id
          },process.env.JWT_KEY||'miClave',{
            expiresIn:'1h'
          });
          res.json({
            message:'auth succes',
            token:token,
            id:doc._id
          });
      }else{
        res.json({
          message:'password incorrecto'
        });
      }
    }
  });
});

router.patch('/:id',(req,res)=>{
    console.log(req.body);
    let id=req.params.id;
    User.findOne({_id:id},(err,doc)=>{
      if(!empty(doc)){
        if(doc.password==sha1(req.body.password)){
          if(!empty(req.body.password2)){
            let data={
              nombre:req.body.nombre,
              apellido:req.body.apellido,
              email:req.body.email,
              password:sha1(req.body.password2)
            };
            User.findByIdAndUpdate({_id:id},data,(err2,doc2)=>{
              res.json({
                message:'user actualizado',
                doc:doc2
              });
            });
          }else{
            let data={
              nombre:req.body.nombre,
              apellido:req.body.apellido,
              email:req.body.email,
            };
            User.findByIdAndUpdate({_id:id},data,(err2,doc2)=>{
              res.json({
                message:'user actualizado',
                doc:doc2
              });
            });
          }
        }else{
          res.json({message:'contraseña incorrecta'});
        }
      }else{
        res.json({message:'el usuario no existe'});
      }
    });

});

router.delete('/:id',(req,res)=>{
    let id=req.params.id;
    User.findByIdAndRemove({_id:id},(err,docs)=>{
      res.json({
        message:'eliminado'
      });
    });
});

router.post('/dato',(req,res)=>{
    console.log(req.headers.token);
    let id=req.body.id;
    User.findOne({_id:id},(err,doc)=>{
      if(empty(doc)){
        res.json({message:'no existe el usuario'});
      }else{
        res.json({
          nombre:doc.nombre,
          apellido:doc.apellido,
          email:doc.email
        });
      }
    });
});

module.exports=router;
