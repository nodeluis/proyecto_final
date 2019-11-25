const Camion=require('../../database/schema/camion');
const General=require('../../database/schema/general');
const ruta=require('./rutas');
const f5=require('./f5');
const express=require('express');
const router=express.Router();
const puppeteer=require('puppeteer');
const empty=require('is-empty');
const jsonQuery = require('json-query');

router.get('/',(req,res)=>{
    Camion.find({},(err,docs)=>{
      if(docs.length>0){
        res.json(docs);
      }else{
        res.json({
          message:'no existen camiones en la bd'
        });
      }
    });
});

router.post('/',async(req,res)=>{
    let id=req.body.id;
    let placa=req.body.placa;
    let obj=new Camion({
      id:id,
      placa:placa
    });
    let result=await obj.save();
    res.json({message:'insertado'});
});

//**********************************expocision*******************************************
//auto -> exesos - horario inhapropiado - km recorrido - horas expocision
//        cant viajes - freciencia de viajes por ruta

router.post('/autoT',(req,res)=>{
    let id=req.body.id;
    let arr=[];
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let fin=(new Date()).toLocaleString();
        let inicio=new Date();
        inicio.setDate(inicio.getDate()-150);
        inicio=inicio.toLocaleString();
        let ini=inicio.split(',');
        let fi=fin.split(',');
        let fecha=rango_fecha_mes(ini[0],fi[0]);
        fecha.forEach((dat)=>{
          dat.forEach((dat2)=>{
            try {
              let wish=jsonQuery('[*fin='+dat2+']',{data:doc.auto}).value;
              arr=arr.concat(wish);
            } catch (e) {}
          });
        });
        let data={
          exceso:[],
          horario:[],
          km:[],
          expocision:[],
          frecuencia:[]
        }
        arr.forEach((dat)=>{
          data.exceso.push({
            fecha:dat.inicio+'-'+dat.fin,
            total:dat.exceso.length
          });
          data.horario.push({
            fecha:dat.inicio+'-'+dat.fin,
            total:dat.horario.length
          });
          data.km.push({
            fecha:dat.inicio+'-'+dat.fin,
            total:parseFloat(dat.km)
          });
          data.expocision.push({
            fecha:dat.inicio+'-'+dat.fin,
            total:parseFloat(dat.expocision)
          });
          let t=true;
          for (let j = 0; j < data.frecuencia.length; j++) {
            if(data.frecuencia[j].ruta==dat.ruta){
              data.frecuencia[j].cant+=1;
              t=false;
            }
          }
          if(t){
            data.frecuencia.push({
              ruta:dat.ruta,
              cant:1
            });
          }
        });
        console.log(data);
        res.json({data:data});
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});

router.post('/auto',(req,res)=>{
    let id=req.body.id;
    let arr=[];
    let f=req.body.filtro;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let fi=req.body.fi;
        let ff=req.body.ff;
        let fecha=rango_fecha_mes(fi,ff);
        fecha.forEach((dat)=>{
          dat.forEach((dat2)=>{
            try {
              let wish=jsonQuery('[*fin='+dat2+']',{data:doc.auto}).value;
              arr=arr.concat(wish);
            } catch (e) {}
          });
        });
        arr=filtar(arr,f);
        res.json({data:arr});
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});

function filtar(arr,f){
    let dev=[];
    if(f==1){
      arr.forEach((dat)=>{
        dev.push(dat.exceso);
      });
    }else if(f==2){
      arr.forEach((dat)=>{
        dev.push(dat.horario);
      });
    }else if(f==3){
      arr.forEach((dat)=>{
        dev.push({
          fecha:dat.inicio+'-'+dat.fin,
          total:parseFloat(dat.km)
        });
      });
    }else if(f==4){
      arr.forEach((dat)=>{
        dev.push({
          fecha:dat.inicio+'-'+dat.fin,
          total:parseFloat(dat.expocision)
        });
      });
    }else if(f==5){
      dev.push(dat.length);
    }else if(f==6){
      ruta.forEach((dat)=>{
        let result=jsonQuery('[*ruta='+dat.key+']',{data:arr}).value;
        if(result.length>0){
          dev.push({
            ruta:dat.key,
            cant:result.length
          });
        }
      });
    }
    return dev;
}


router.post('/autoMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fin='+p2+']',{data:doc.auto}).value;
            result=result.concat(dat);
          }
        }
        res.json({data:result});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});
//**********************************expocision fin***************************************

//**********************************intermedios******************************************

//desvios conductor
router.post('/desvio',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.desvioConductor.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.desvioConductor=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'falta del conductor insertada'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/desvioMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.desvioConductor}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//desvio vehiculo
router.post('/desvioCamion',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.desvioCamion.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.desvioCamion=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'falta del camion insertada'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/desvioCamionMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.desvioCamion}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//via
router.post('/via',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.via.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.via=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'problema en la via insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/viaMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.via}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//viaje afectado
router.post('/viajeAfectado',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.viajeAfectado.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.viajeAfectado=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'viaje afectado insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/viajeAfectadoMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.viajeAfectado}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//otro
router.post('/otro',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.otro.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.otro=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'otro insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/otroMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.otro}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//**********************************intermedios fin**************************************

//**********************************indicadores finales**********************************

//incidente
router.post('/incidente',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let data=req.body.data.split(',');
    let desc=req.body.desc;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.incidente.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            falta:data,
            desc:desc
          });
          doc.incidente=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'incidente insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/incidenteMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.incidente}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//fatal
router.post('/fatal',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let accidente=req.body.accidente.split(',');
    let desc=req.body.desc;
    let arr=req.body.ruta.split(',');
    let ruta='';
    let km=0;
    arr.forEach((d)=>{
      ruta=(ruta=='')?d:ruta+'-'+d;
    });
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.auto.forEach((dat)=>{
            km+=parseDouble(dat.km);
          });
          if(empty(doc.auto)){
            km-=parseDouble(doc.fatal[doc.fatal.length-1].km);
            km=(km<0)?km*(-1):km;
          }
        } catch (e) {}
        try {
          doc.fatal.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            ruta:ruta,
            accidente:accidente,
            km:km,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            ruta:ruta,
            accidente:accidente,
            km:km,
            desc:desc
          });
          doc.fatal=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'axidente fatal insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/fatalMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.fatal}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//medico
router.post('/medico',(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha.split('/');
    let accidente=req.body.accidente.split(',');
    let desc=req.body.desc;
    let arr=req.body.ruta.split(',');
    let ruta='';
    let km=0;
    arr.forEach((d)=>{
      ruta=(ruta=='')?d:ruta+'-'+d;
    });
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        try {
          doc.auto.forEach((dat)=>{
            km+=parseDouble(dat.km);
          });
          if(!empty(doc.medico)){
            km-=parseDouble(doc.medico[doc.medico.length-1].km);
            km=(km<0)?km*(-1):km;
          }
        } catch (e) {}
        try {
          doc.medico.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            ruta:ruta,
            accidente:accidente,
            km:km,
            desc:desc
          });
        } catch (e) {
          let aux=[];
          aux.push({
            fecha:fecha[1]+'-'+fecha[0]+'-'+fecha[2],
            ruta:ruta,
            accidente:accidente,
            km:km,
            desc:desc
          });
          doc.medico=aux;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          console.log('falta conductor success');
          res.json({message:'accidente con baja medica insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});
router.post('/medicoMes',(req,res)=>{
    let id=req.body.id;
    let fecha=[];
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      fecha=rango_fecha_mes(inicio,fin);
    } catch (e) {
      let fin=(new Date()).toLocaleString();
      let inicio=new Date();
      inicio.setDate(inicio.getDate()-150);
      inicio=inicio.toLocaleString();
      let ini=inicio.split(',');
      let fi=fin.split(',');
      fecha=rango_fecha_mes(ini[0],fi[0]);
    }
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        let dataChart=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let sum=0;
          let imso=p[0].split('-');
          for (let m = 0; m < p.length; m++) {
            let p2=p[m];
            let dat=jsonQuery('[*fecha='+p2+']',{data:doc.medico}).value;
            result=result.concat(dat);
            try{
              dat.forEach((le)=>{
                sum+=le.falta.length;
              });
            }catch(err){
            }
          }
          dataChart.push({
            fecha:imso[1]+'/'+imso[0],
            total:sum
          });
        }
        res.json({data1:result,data2:dataChart});
      }else{
        res.json({message:'mo existe el camion'});
      }
    });
});

//**********************************indicadores finales fin******************************


//***********************************vista general charts********************************

//expocision
router.post('/generalExpocision',(req,res)=>{
    let arr=[];
    let id=req.body.id;
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=[0,0,0,[]];
          fecha.forEach((dat)=>{
            let result=jsonQuery('[*fin='+dat+']',{data:doc.auto}).value;
            if(!empty(result)){
              sum[0]+=parseFloat(result[0].km);
              sum[1]+=result[0].parseFloat(dat.expocision);
              sum[2]+=1;
              sum[3]=alter_ruta(result[0].ruta,sum[3]);
            }
          });
          res.json({data:sum});
        }else{
          res.json({message:'camion no existe'});
        }
      });
    } catch (e) {
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=[0,0,0,[]];
          let t=true;
          doc.auto.forEach((dat)=>{
            if(t){
              t=false;
            }else{
              sum[0]+=parseFloat(dat.km);
              sum[1]+=parseFloat(dat.expocision);
              sum[2]+=1;
              sum[3]=alter_ruta(dat.ruta,sum[3]);
            }
          });
          res.json({data:sum});
        }else{
          res.json({message:'camion no existe'});
        }
      });
    }
});

//Intermedio
router.post('/generalIntermedio',(req,res)=>{
    let id=req.body.id;
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=[0,0,0,0,0,0,0];
          fecha.forEach((dat)=>{
            let result=jsonQuery('[*fin='+dat+']',{data:doc.auto}).value;
            if(!empty(result)){
              sum[0]+=result[0].exceso.length;
              sum[1]+=result[0].horario.length;
            }
            let result2=jsonQuery('[*fecha='+dat+']',{data:doc.desvioConductor}).value;
            try {
              result2.forEach((dat)=>{
                sum[2]+=dat.falta.length;
              });
            } catch (e) {}
            let result3=jsonQuery('[*fecha='+dat+']',{data:doc.desvioCamion}).value;
            try {
              result3.forEach((dat)=>{
                sum[3]+=dat.falta.length;
              });
            } catch (e) {}
            let result4=jsonQuery('[*fecha='+dat+']',{data:doc.via}).value;
            try {
              result4.forEach((dat)=>{
                sum[4]+=dat.falta.length;
              });
            } catch (e) {}
            let result5=jsonQuery('[*fecha='+dat+']',{data:doc.viajeAfectado}).value;
            try {
              result5.forEach((dat)=>{
                sum[5]+=dat.falta.length;
              });
            } catch (e) {}
            let result6=jsonQuery('[*fecha='+dat+']',{data:doc.otro}).value;
            try {
              result6.forEach((dat)=>{
                sum[6]+=dat.falta.length;
              });
            } catch (e) {}
          });
          res.json({data:sum});
        }else{
          res.json({message:'camion no existe'});
        }
      });
    } catch (e) {
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=[0,0,0,0,0,0,0];
          try {
            doc.auto.forEach((dat)=>{
              sum[0]+=dat.exceso.length;
              sum[1]+=dat.horario.length;
            });
          } catch (e) {}
          try {
            doc.desvioConductor.forEach((dat)=>{
              sum[2]+=dat.falta.length;
            });
          } catch (e) {}
          try {
            doc.desvioCamion.forEach((dat)=>{
              sum[3]+=dat.falta.length;
            });
          } catch (e) {}
          try {
            doc.via.forEach((dat)=>{
              sum[4]+=dat.falta.length;
            });
          } catch (e) {}
          try {
            doc.viajeAfectado.forEach((dat)=>{
              sum[5]+=dat.falta.length;
            });
          } catch (e) {}
          try {
            doc.otro.forEach((dat)=>{
              sum[6]+=dat.falta.length;
            });
          } catch (e) {}
          res.json({data:sum});
        }else{
          res.json({message:'camion no existe'});
        }
      });
    }
});

//final
router.post('/generalFinal',(req,res)=>{
    let id=req.body.id;
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){

        }else{
          res.json({message:'camion no existe'});
        }
      });
    } catch (e) {
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){

        }else{
          res.json({message:'camion no existe'});
        }
      });
    }
});

//***********************************vista general charts fin****************************

//***********************************incersion control **********************************

router.post('/on',(req,res)=>{
    console.log(req.body);
    let id=req.body.id;
    let t=req.body.t;
    let fecha=req.body.fecha.split(' ');
    Camion.findOne({id:id},async(err,doc)=>{
      if(!empty(doc)){
        if(t==1){
          let desc=req.body.desc;
          let arr=req.body.ruta.split(',');
          let str='';
          arr.forEach((d)=>{
            str=(str=='')?str+d:str+'-'+d;
          });
          //let str=req.body.ruta;
          let result=jsonQuery('[*key='+str+']',{data:ruta}).value;
          let aut={
            inicio:fecha[0],
            fin:'',
            ih:fecha[1],
            fh:'',
            exceso:[],
            horario:[],
            expocision:'',
            ruta:str,
            km:result[0].value,
            desc:desc
          };
          try {
            doc.auto.push(aut);
          } catch (e) {
            let aux=[];
            aux.push(aut);
            doc.auto=aux;
          }
          General.findOne({id:id},async(err2,doc2)=>{
            doc2.control=true;
            General.findByIdAndUpdate(doc2._id,doc2,()=>{
              console.log('cambiado control a true');
            });
          });
          Camion.findByIdAndUpdate(doc._id,doc,()=>{
            res.json({message:'actualizado camion'});
          });
        }else{
          let aut=doc.auto.pop();
          console.log(id+'&fechaDesde='+aut.inicio+'%20'+aut.ih+'&fechaHasta='+fecha[0]+'%20'+fecha[1]);
          const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
          const page = await browser.newPage();
          await page.setDefaultNavigationTimeout(0);
          console.log("Entrando a 200.87.207.36");
          await page.goto('http://200.87.207.36');
          await page.type("#codigo_usu", 'veracruz');
          await page.type("#clave_usu", 'ypfbveracruz');
          await page.click("button");
          await page.waitForNavigation();
          console.log("consultando servicio")
          await page.goto('http://200.87.207.36//googleMapsGenerarRecorrido.php?IdMov='+id+'&fechaDesde='+aut.inicio+'%20'+aut.ih+'&fechaHasta='+fecha[0]+'%20'+fecha[1]);
          const data = await page.evaluate(() => {
          return {
              json: JSON.parse(document.documentElement.outerText)
            };
          });
          console.log("final");
          await browser.close();
          let sums=f5(data.json);
          aut.fin+=fecha[0];
          aut.fh+=fecha[1];
          aut.exceso=aut.exceso.concat(sums.exceso);
          aut.horario=aut.horario.concat(sums.hora);
          aut.expocision+=(sums.expo)/60;
          doc.auto.push(aut);
          General.findOne({id:id},async(err2,doc2)=>{
            doc2.control=false;
            General.findByIdAndUpdate(doc2._id,doc2,()=>{
              console.log('cambiado control a false');
            });
          });
          Camion.findByIdAndUpdate(doc._id,doc,()=>{
            res.json({message:'actualizado camion'});
          });
        }
      }else{
        res.json({message:'el camion no existe'});
      }
    });
});


//***********************************incersion control fin ******************************

router.post('/extintor',(req,res)=>{
    let arr=req.body.data.split(',');
    let id=req.body.id;
    let t=((arr[3]=='Aplica')?true:false);
    let ob={
      botella:arr[4],
      etiqueta:arr[5],
      mangera:arr[6],
      boquilla:arr[7],
      peso:arr[8],
      manometro:arr[9],
      seguro:arr[10],
      ubicacion:arr[11],
      limpieza:arr[12],
      area:arr[13],
      trabajo:arr[14],
      señalizado:arr[15]
    };
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        if(empty(doc.extintor)){
          let p=[];
          p.push({
            lugar:arr[0],
            fecha:arr[2],
            observacion:arr[1],
            aplica:t,
            check:ob
          });
          doc.extintor=p;
        }else{
          doc.extintor.push({
            lugar:arr[0],
            fecha:arr[2],
            observacion:arr[1],
            aplica:t,
            check:ob
          });
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          res.json({message:'nuevo check list del extintor insertado'});
        });
      }else{
        res.json({message:'el camion no existe'});
      }
    });
});

router.post('/dataextintor',(req,res)=>{
    let id=req.body.id;
    let i=req.body.i;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let arr=[];
        for (let j =(doc.extintor.length-1)-(i*40),k=0; j>=0&&k<40 ; j--,k++) {
          arr.push(doc.extintor[j]);
        }
        res.json(arr);
      }else{
        res.json([]);
      }
    });
});


router.post('/coleccionChartIncidente',(req,res)=>{
    let env=[];
    let id=req.body.id;
    try {
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=0;
          for (let m = 0; m < fecha.length; m++) {
            let p=fecha[m];
            let que=jsonQuery('[*fecha='+p+']',{data:doc.incidente}).value;
            try {
              que.forEach((dat)=>{
                sum+=dat.falta.length;
              });
            } catch (e){}
          }
          env.push({
            desc:'Frecuencia total de incidentes desde '+inicio+' hasta '+fin,
            total:sum
          });
          res.json(env);
        }else{
          res.json({message:'camion no existe'});
        }
      });
    } catch (e) {
      Camion.findOne({id:id},(err,doc)=>{
        if(!empty(doc)){
          let sum=0;
          try {
            doc.incidente.forEach((dat)=>{
              sum+=dat.falta.length;
            });
          } catch (e) {}
          env.push({
            desc:'Frecuencia total de incidentes',
            total:sum
          });
          res.json(env);
        }else{
          res.json({message:'camion no existe'});
        }
      });
    }
});

router.post('/ruta',(req,res)=>{
    let arr=req.body.data.split(',');
    let str='';
    arr.forEach((d)=>{
      str=(str=='')?str+d:str+'-'+d;
    });
    let result=jsonQuery('[*key='+str+']',{data:ruta}).value;
    res.json({data:result});
});


function rango_fecha(inicio,fin){
  let arr=[0,31,28,31,30,31,30,31,31,30,31,30,31];
  let fi=inicio;
  let ff=fin;
  let f1=fi.split('/');
  let f2=ff.split('/');
  let t=true;
  let fecha=[];
  let i = parseInt(f1[2]);
  let day=parseInt(f1[1]);
  for (let j = parseInt(f1[0]);t; j=((j==12)?1:j+1)) {
    for (let k = day; k <= arr[j]; k++) {
      if(j==parseInt(f2[0])&&k==parseInt(f2[1])&&i==parseInt(f2[2])){
        fecha.push(((i<10)?'0'+i:i)+'-'+((j<10)?'0'+j:j)+'-'+((k<10)?'0'+k:k));
        t=false;
        break;
      }else{
        fecha.push(((i<10)?'0'+i:i)+'-'+((j<10)?'0'+j:j)+'-'+((k<10)?'0'+k:k));
      }
    }
    day=1;
    if(j==12)i++;
  }
  return fecha;
}

function rango_fecha_mes(inicio,fin){
  let arr=[0,31,28,31,30,31,30,31,31,30,31,30,31];
  let fi=inicio;
  let ff=fin;
  let f1=fi.split('/');
  let f2=ff.split('/');
  let t=true;
  let fecha=[];
  let aux=[];
  let i = parseInt(f1[2]);
  let day=parseInt(f1[1]);
  for (let j = parseInt(f1[0]);t; j=((j==12)?1:j+1)) {
    for (let k = day; k <= arr[j]; k++) {
      if(j==parseInt(f2[0])&&k==parseInt(f2[1])&&i==parseInt(f2[2])){
        aux.push(((i<10)?'0'+i:i)+'-'+((j<10)?'0'+j:j)+'-'+((k<10)?'0'+k:k));
        t=false;
        break;
      }else{
        aux.push(((i<10)?'0'+i:i)+'-'+((j<10)?'0'+j:j)+'-'+((k<10)?'0'+k:k));
      }
    }
    day=1;
    if(j==12)i++;
    fecha.push(aux);
    aux=[];
  }
  return fecha;
}

function alter_ruta(ruta,arr){
    let t=true;
    arr.forEach((dat)=>{
      if(dat.ruta==ruta){
        dat.cant+=1;
        t=false;
        return;
      }
    });
    if(t){
      arr.push({
        ruta:ruta,
        cant:1
      });
    }
    return arr;
}

module.exports=router;
