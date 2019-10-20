const General=require('../../database/schema/general');
const express=require('express');
const router=express.Router();
const empty=require('is-empty');
//const JsonFind = require('json-find');
const jsonQuery = require('json-query');

router.get('/',(req,res)=>{
    General.find({},(err,docs)=>{
      if(!empty(docs)){
        res.json(docs);
      }else{
        res.json({
          message:'no existen datos en la bd'
        });
      }
    });

});

router.get('/probar',(req,res)=>{
    /*General.find().limit(4).skip(0).exec((err,doc)=>{
      res.json(doc);
    });*/
    /*var fatos=[{otro:'busca1',lol:'gsrgr'},{otro:'busca1'},{otroqueno:'busca3'}];
    let dat=jsonQuery('[*otro=busca1]',{data:fatos}).value;
    res.json(dat);*/
    /*var fatos=[{otro:'busca1',lol:'gsrgr'},{otro:'busca1'},{otroqueno:'busca3'}];
    var fatos2=[{otro:'busca1',lol:'gsrgr'},{otro:'busca1'},{otroqueno:'busca3'}];
    fatos=fatos.concat(fatos2);*/
    /*var arr=[0,1,2,3,4,5];
    res.json({arr:arr.slice(1,2+1)});*/
    /*let fin=(new Date()).toLocaleString();
    let inicio=new Date();
    inicio.setDate(inicio.getDate()-365);
    inicio=inicio.toLocaleString();
    let ini=inicio.split(',');
    let fi=fin.split(',');
    console.log(ini[0]);
    console.log(fi[0]);
    res.json({
      inicio:inicio,
      fin:fin
    });*/
    let mostrar={};
    for (let i = 0; i < 8; i++) {
      mostrar['data'+i]='data'+i;
    }
    res.json(mostrar);
});

router.patch('/control/:id',(req,res)=>{
    let id=req.params.id;
    General.findOne({_id:id},(err,doc)=>{
      if(!empty(doc)){
        doc.control=true;
        General.findByIdAndUpdate(id,doc,()=>{
          res.json({message:'camion ahora esta siendo monitoreado'});
        });
      }else{
        res.json({message:'error no existe camion'});
      }
    });
});

router.get('/ver_si_controla/:id',(req,res)=>{
  let id=req.params.id;
  General.findOne({_id:id},(err,doc)=>{
    if(!empty(doc)){
      if(doc.control){
        res.json({
          lat:doc.lat,
          lon:doc.lon,
          message:'si'
        });
      }else{
        res.json({
          lat:doc.lat,
          lon:doc.lon,
          message:'no'
        });
      }
    }else{
      res.json({message:'error no existe camion'});
    }
  });
});

module.exports=router;
