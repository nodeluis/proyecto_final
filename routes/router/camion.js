const Camion=require('../../database/schema/camion');
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

router.post('/actualizar',async(req,res)=>{
    let pl=req.body.pl;
    let f=new Date();
    let qu=f.getFullYear()+'-'+((f.getMonth()<9)?'0'+(f.getMonth()+1):(f.getMonth()+1))+'-'+((f.getDate()<10)?'0'+f.getDate():f.getDate());
    let id=req.body.id;
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    console.log("Entrando a 200.87.207.36");
    await page.goto('http://200.87.207.36');
    //await page.focus('#codigo_usu');
    await page.type("#codigo_usu", 'veracruz');
    //await page.focus('#clave_usu');
    await page.type("#clave_usu", 'ypfbveracruz');
    await page.click("button")
    //await page.press('Enter');
    await page.waitForNavigation();
    console.log("consultando servicio");

    console.log('actualizando datos de '+ pl+' en fecha '+qu);
    //await page.goto('http://200.87.207.36//googleMapsGenerarRecorrido.php?IdMov='+id+'&fechaDesde='+qu+'%2000:01&fechaHasta='+qu+'%2023:59');
    await page.goto('http://200.87.207.36//googleMapsGenerarRecorrido.php?IdMov='+id+'&fechaDesde=2019-10-17%2000:01&fechaHasta=2019-10-17%2023:59');
    const dataxcamion = await page.evaluate(() => {
    return {
        json: JSON.parse(document.documentElement.outerText)
      };
    });
    if(!empty(dataxcamion.json)){
      let inf=[];
      let inf2=[];
      let t1=true;
      let t2=true;
      Camion.findOne({id:id},(err,doc)=>{
        for (let k = dataxcamion.json.length-1; k>=0 ; k--) {
          //console.log(inf);
          let dat=dataxcamion.json[k];
          let fech=dat['Fecha'].split(' ');
          let ho=fech[1].split(':');
          if(dat['Velocidad']>70&&t1){
            if(!empty(doc)&&!empty(doc.exceso)){
              let ult=doc.exceso[doc.exceso.length-1];
              if(ult.fecha==fech[0]&&ult.hora==fech[1]&&ult.lat==(dat['Latitud']+'')&&ult.lon==(dat['Longitud']+'')){
                t1=false;
              }else{
                inf.push({
                  lat:dat['Latitud'],
                  lon:dat['Longitud'],
                  lugar:dat['Referencia'],
                  velocidad:dat['Velocidad'],
                  fecha:fech[0],
                  hora:fech[1]
                });
              }
            }else{
              inf.push({
                lat:dat['Latitud'],
                lon:dat['Longitud'],
                lugar:dat['Referencia'],
                velocidad:dat['Velocidad'],
                fecha:fech[0],
                hora:fech[1]
              });
            }
          }
          if(parseInt(ho[0])>=0&&parseInt(ho[0])<8&&dat['Velocidad']>0&&t2){
            if(!empty(doc)&&!empty(doc.horario)){
              let ult=doc.horario[doc.horario.length-1];
              if(ult.fecha==fech[0]&&ult.hora==fech[1]&&ult.lat==(dat['Latitud']+'')&&ult.lon==(dat['Longitud']+'')){
                t2=false;
              }else{
                inf2.push({
                  lat:dat['Latitud'],
                  lon:dat['Longitud'],
                  lugar:dat['Referencia'],
                  fecha:fech[0],
                  hora:fech[1]
                });
              }
            }else{
              inf2.push({
                lat:dat['Latitud'],
                lon:dat['Longitud'],
                lugar:dat['Referencia'],
                velocidad:dat['Velocidad'],
                fecha:fech[0],
                hora:fech[1]
              });
            }
          }
        }
        if(empty(doc)){
          let aux1=[];
          let aux2=[];
          for (let z = inf.length-1; z >=0 ; z--) {
            aux1.push(inf[z]);
          }
          for (let z = inf2.length-1; z >=0 ; z--) {
            aux2.push(inf2[z]);
          }
          let obj2={
            id:id,
            placa:pl,
            excesos:aux1,
            horario:aux2
          };
          let ins=new Camion(obj2);
          ins.save().then(()=>{
            console.log('nuevo camion insertado');
          }).catch(()=>{
            console.log('error de la coleccion camion');
          });
        }else{
          console.log('-------------------------------------------');
          console.log(inf);
          console.log('-------------------------------------------');
          console.log(inf2);
          if(empty(doc.exceso)){
            let aux1=[];
            for (let z = inf.length-1; z >=0 ; z--) {
              aux1.push(inf[z]);
            }
            doc.exceso=aux1;
          }else{
            for (let z = inf.length-1; z >=0 ; z--) {
              doc.exceso.push(inf[z]);
            }
          }
          if(empty(doc.horario)){
            let aux1=[];
            for (let z = inf2.length-1; z >=0 ; z--) {
              aux1.push(inf2[z]);
            }
            doc.horario=aux1;
          }else{
            for (let z = inf2.length-1; z >=0 ; z--) {
              doc.horario.push(inf2[z]);
            }
          }
          Camion.findByIdAndUpdate(doc._id,doc,()=>{
            console.log('camion actualizado '+id);
          });
        }
      });
    }
    res.json({funciona:'funciona'});
});

router.post('/exceso2',(req,res)=>{
    let id=req.body.id;
    let i=req.body.i;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let arr=[];
        for (let j =(doc.exceso.length-1)-(i*40),k=0; j>=0&&k<40 ; j--,k++) {
          arr.push(doc.exceso[j]);
        }
        res.json(arr);
      }else{
        res.json([]);
      }
    });
});

router.post('/horario',(req,res)=>{
    let id=req.body.id;
    let i=req.body.i;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let arr=[];
        for (let j =(doc.horario.length-1)-(i*40),k=0; j>=0&&k<40 ; j--,k++) {
          arr.push(doc.horario[j]);
        }
        res.json(arr);
      }else{
        res.json([]);
      }
    });
});



router.get('/exceso/:id',async(req,res)=>{
  let id=req.params.id;
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  console.log("Entrando a 200.87.207.36");
  await page.goto('http://200.87.207.36');
  //await page.focus('#codigo_usu');
  await page.type("#codigo_usu", 'veracruz');
  //await page.focus('#clave_usu');
  await page.type("#clave_usu", 'ypfbveracruz');
  await page.click("button")
  //await page.press('Enter');
  await page.waitForNavigation();
  console.log("consultando servicio")
  await page.goto('http://200.87.207.36//googleMapsGenerarRecorrido.php?IdMov='+id+'&fechaDesde=2019-09-08%2000:01&fechaHasta=2019-09-10%2023:59');
  const data = await page.evaluate(() => {
  return {
      json: JSON.parse(document.documentElement.outerText)
    };
  });
  //4745
  let co=[];
  for (var i = 0; i < data.json.length; i++) {
    let da=data.json[i];
    //console.log(da['Velocidad']);
    if(da['Velocidad']>70){
      co.push(da);
    }
  }
  console.log("final");
  await browser.close();
  res.json(co);
});

router.post('/fechaE',(req,res)=>{
    let id=req.body.id;
    let fecha=rango_fecha(req.body.fi,req.body.ff);
    console.log(fecha);
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let dat=jsonQuery('[*fecha='+p+']',{data:doc.exceso}).value;
          result=result.concat(dat);
        }
        res.json(result);
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});

router.post('/fechaH',(req,res)=>{
    let id=req.body.id;
    let fecha=rango_fecha(req.body.fi,req.body.ff);
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let result=[];
        for (let j = 0; j < fecha.length; j++) {
          let p=fecha[j];
          let dat=jsonQuery('[*fecha='+p+']',{data:doc.horario}).value;
          result=result.concat(dat);
        }
        res.json(result);
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});

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

router.post('/incidente',(req,res)=>{
    let arr=req.body.data.split(',');
    let id=req.body.id;
    Camion.findOne({id:id},(err,doc)=>{
      if(!empty(doc)){
        let fe=arr[0].split('/');
        let obj={
          fecha:fe[2]+'-'+fe[0]+'-'+fe[1],
          falta:arr.slice(2,arr.length),
          desc:arr[1]
        };
        console.log(obj);
        if(!empty(doc.incidente)){
          doc.incidente.push(obj);
        }else{
          let ins=[];
          ins.push(obj);
          doc.incidente=ins;
        }
        Camion.findByIdAndUpdate(doc._id,doc,()=>{
          res.json({message:'nuevo incidente insertado'});
        });
      }else{
        res.json({message:'no existe el camion'});
      }
    });
});

router.post('/vistaIncidente',(req,res)=>{
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


module.exports=router;
