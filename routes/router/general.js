const General=require('../../database/schema/general');
const Camion=require('../../database/schema/camion');
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

router.post('/probar',(req,res)=>{
    /*General.find().limit(4).skip(0).exec((err,doc)=>{
      res.json(doc);
    });*/
    /*var fatos=[{otro:'busca1',lol:'gsrgr',prueba:'busca1'},
              {otro:'busca1'},
              {otroqueno:'busca3',prueba:'busca1'}];
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
    /*let mostrar={};
    for (let i = 0; i < 8; i++) {
      mostrar['data'+i]='data'+i;
    }
    res.json(mostrar);*/
    /*try {
      res.json({message:data});
    } catch (e) {
      res.json({message:sdata});
    } finally {
      res.json({message:1});
    }*/
    let id=req.body.id;//id del documento
    let elim=req.body.elim;//id dentro de un array
    Camion.findOne({_id:id},(err,doc)=>{
        let index=doc.auto.findIndex((item, i)=>{
          return item._id == elim;
        });
        doc.auto.splice(index,1);
        Camion.findByIdAndUpdate(id,doc,()=>{
          res.json({data:'eliminado'});
        });

        //res.json({data:doc2});
    });
});


//**********************************general expocision**************************

router.get('/genExpocision',(req,res)=>{
    try {
      let f=req.body.filtro;
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.find({},(err,docs)=>{
        if(!empty(docs)){
          if(f==1){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=parseFloat(it.km);
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({km:camions});
          }else if(f==2){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=parseFloat(it.expocision);
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({hora:camions});
          }else if(f==3){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              sum=str.length;
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({cant:camions});
          }else if(f==4){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                let index=camions.findIndex((item, i)=>{
                  return item.ruta == it.ruta;
                });
                if(index==-1){
                  camions.push({
                    ruta:it.ruta,
                    total:1
                  });
                }else{
                  camions[index].total+=1;
                }
              });
            });
            res.json({frec:camions});
          }
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    } catch (e) {
      Camion.find({},(err,docs)=>{
        let dat1=[];
        let dat2=[];
        let dat3=[];
        let frec=[];
        let tabla=[];
        if(!empty(docs)){
          docs.forEach(data => {
            let sumKm=0;
            let sumHr=0;
            data.auto.forEach(dat => {
              sumKm+=parseFloat(dat.km);
              sumHr+=parseFloat(dat.expocision);
              let index=frec.findIndex((item, i)=>{
                return item.ruta == dat.ruta;
              });
              if(index==-1){
                frec.push({
                  ruta:dat.ruta,
                  total:1
                });
              }else{
                frec[index].total+=1;
              }
              tabla.push({
                inicio:dat.inicio,
                fin:dat.fin,
                km:dat.km,
                expocision:dat.expocision,
                ruta:dat.ruta,
                desc:dat.desc
              });
            });
            dat1.push({
              placa:data.placa,
              total:sumKm
            });
            dat2.push({
              placa:data.placa,
              total:sumHr
            });
            dat3.push({
              placa:data.placa,
              total:data.auto.length
            });
          });
          res.json({
            km:dat1,
            hora:dat2,
            cant:dat3,
            frec:frec,
            tabla:tabla
          });
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    }
});


//**********************************general expocision fin**********************

//**********************************general intermedio**************************

router.get('/genIntermedio',(req,res)=>{
    try {
      let f=req.body.filtro;
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.find({},(err,docs)=>{
        if(!empty(docs)){
          if(f==1){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.exceso.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({exceso:camions});
          }else if(f==2){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.horario.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({horario:camions});
          }else if(f==3){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.desvioConductor}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({desvio:camions});
          }else if(f==4){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.desvioCamion}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({desvioCam:camions});
          }else if(f==5){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.via}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({via:camions});
          }else if(f==6){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.viajeAfectado}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({afectado:camions});
          }else if(f==7){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.otro}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({otro:camions});
          }
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    } catch (e) {
      Camion.find({},(err,docs)=>{
        let dat1=[];
        let dat2=[];
        let dat3=[];
        let dat4=[];
        let dat5=[];
        let dat6=[];
        let dat7=[];
        let tabla1=[];
        let tabla2=[];
        if(!empty(docs)){
          docs.forEach(data => {
            let sum1=0;
            let sum2=0;
            data.auto.forEach(dat => {
              tabla1.push({
                inicio:dat.inicio,
                fin:dat.fin,
                exceso:dat.exceso.length,
                horario:dat.horario.length,
                desc:dat.desc
              });
              sum1+=dat.exceso.length;
              sum2+=dat.horario.length;
            });
            dat1.push({
              placa:data.placa,
              total:sum1
            });
            dat2.push({
              placa:data.placa,
              total:sum2
            });
            let sum=0;
            let pila=[];
            data.desvioConductor.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat3.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.desvioCamion.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat4.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.via.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat5.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.viajeAfectado.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat6.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.otro.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat7.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
          });
          res.json({
            exceso:dat1,
            horario:dat2,
            desvio:dat3,
            desvioCam:dat4,
            via:dat5,
            afectado:dat6,
            otro:dat7,
            tab1:tabla1,
            tab2:tabla2
          });
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    }
});

//**********************************general intermedio fin**********************

//**********************************general finales*****************************

router.get('/genFinal',(req,res)=>{
    try {
      let f=req.body.filtro;
      let inicio=req.body.fi;
      let fin=req.body.ff;
      let fecha=rango_fecha(inicio,fin);
      Camion.find({},(err,docs)=>{
        if(!empty(docs)){
          if(f==1){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.exceso.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({exceso:camions});
          }else if(f==2){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fin='+fech+']',{data:dat.auto}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.horario.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({horario:camions});
          }else if(f==3){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.desvioConductor}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({desvio:camions});
          }else if(f==4){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.desvioCamion}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({desvioCam:camions});
          }else if(f==5){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.via}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({via:camions});
          }else if(f==6){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.viajeAfectado}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({afectado:camions});
          }else if(f==7){
            let camions=[];
            docs.forEach(dat=> {
              let str=[];
              fecha.forEach(fech => {
                let resul=jsonQuery('[*fecha='+fech+']',{data:dat.otro}).value;
                if(!empty(resul)){
                  str=str.concat(resul);
                }
              });
              let sum=0;
              str.forEach((it) => {
                sum+=it.falta.length;
              });
              camions.push({
                placa:dat.placa,
                total:sum
              });
            });
            res.json({otro:camions});
          }
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    } catch (e) {
      Camion.find({},(err,docs)=>{
        let dat1=[];
        let dat2=[];
        let dat3=[];
        let dat4=[];
        let dat5=[];
        let tabla=[];
        if(!empty(docs)){
          docs.forEach(data => {
            let sum1=0;
            let sum2=0;
            data.auto.forEach(dat => {
              tabla1.push({
                inicio:dat.inicio,
                fin:dat.fin,
                exceso:dat.exceso.length,
                horario:dat.horario.length,
                desc:dat.desc
              });
              sum1+=dat.exceso.length;
              sum2+=dat.horario.length;
            });
            dat1.push({
              placa:data.placa,
              total:sum1
            });
            dat2.push({
              placa:data.placa,
              total:sum2
            });
            let sum=0;
            let pila=[];
            data.desvioConductor.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat3.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.desvioCamion.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat4.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.via.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat5.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.viajeAfectado.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat6.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
            sum=0;
            pila=[];
            data.otro.forEach(dat => {
              sum+=dat.falta;
              pila.push({
                fecha:dat.fecha,
                falta:dat.falta.length,
                desc:dat.desc
              });
            });
            dat7.push({
              placa:data.placa,
              total:sum
            });
            tabla2.concat(pila);
          });
          res.json({
            exceso:dat1,
            horario:dat2,
            desvio:dat3,
            desvioCam:dat4,
            via:dat5,
            afectado:dat6,
            otro:dat7,
            tab1:tabla1,
            tab2:tabla2
          });
        }else{
          res.json({message:'la db esta vacia'});
        }
      });
    }
});

//**********************************general finales fin*************************
router.post('/control',(req,res)=>{
    let id=req.body.id;
    General.findOne({_id:id},(err,doc)=>{
      if(!empty(doc)){
        if(doc.control){
          doc.control=false;
        }else{
          doc.control=true;
        }
        General.findByIdAndUpdate(id,doc,()=>{
          res.json({message:'camion ahora esta siendo monitoreado'});
        });
      }else{
        res.json({message:'error no existe camion'});
      }
    });
});

router.get('/control/:id',(req,res)=>{
    let id=req.params.id;
    General.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        res.json({control:doc.control});
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

function rango_fecha(inicio,fin){
  let arr=[0,31,29,31,30,31,30,31,31,30,31,30,31];
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

module.exports=router;
