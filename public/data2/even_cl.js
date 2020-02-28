//button control
$('#control').on('click',function(e){
  e.preventDefault();
  var url='/veracruz2';
  $(location).attr('href',url);
});


//expocision button
$('#Exp').on('click',function(e){
  e.preventDefault();
  clean();
  $('#expocision').show();
  /*let postdata={
    id:dato['id'],
    i:exinplusign
  };*/
  $.post('/general/genExpocision',null,function(resp,status){
    console.log(resp);
    llenarTab(resp.tabla,1,'kmTabla');
    let arr=[];
    let conten=1;
    for (let i = 0,j=0; i < resp.km.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'kmChart'+conten);
        addCss('kmChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.km[i]);
    }
    if(arr.length>0){
      chart(arr,1,'kmChart'+conten);
      addCss('kmChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.hora.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'horChart'+conten);
        addCss('horChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.hora[i]);
    }
    if(arr.length>0){
      chart(arr,1,'horChart'+conten);
      addCss('horChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.cant.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'viajeChart'+conten);
        addCss('viajeChar'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.cant[i]);
    }
    if(arr.length>0){
      chart(arr,1,'viajeChart'+conten);
      addCss('viajeChart'+conten);
      conten=1;
      arr=[];
    }
    chart(resp.frec,2,'rutaChart');
    addCss('rutaChart');
  },'json').fail(function(err){
    console.log(err);
  });
});
//intermedio button
$('#Int').on('click',function(e){
  e.preventDefault();
  clean();
  $('#intermedio').show();
  /*let postdata={
    id:dato['id'],
    i:exinplusign
  };*/
  $.post('/general/genIntermedio',null,function(resp,status){
    console.log(resp);
    //intermedioTabla2
    llenarTab(resp.tab1,2,'intermedioTabla1');
    llenarTab(resp.tab2,3,'intermedioTabla2');
    let arr=[];
    let conten=1;
    for (let i = 0,j=0; i < resp.exceso.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'exChart'+conten);
        addCss('exChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.exceso[i]);
    }
    if(arr.length>0){
      chart(arr,1,'exChart'+conten);
      addCss('exChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.horario.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'horarioChart'+conten);
        addCss('horarioChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.horario[i]);
    }
    if(arr.length>0){
      chart(arr,1,'horarioChart'+conten);
      addCss('horarioChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.desvio.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'desvChart'+conten);
        addCss('desvChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.desvio[i]);
    }
    if(arr.length>0){
      chart(arr,1,'desvChart'+conten);
      addCss('desvChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.desvioCam.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'desvCamChart'+conten);
        addCss('desvCamChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.desvioCam[i]);
    }
    if(arr.length>0){
      chart(arr,1,'desvCamChart'+conten);
      addCss('desvCamChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.via.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'viaChart'+conten);
        addCss('viaChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.via[i]);
    }
    if(arr.length>0){
      chart(arr,1,'viaChart'+conten);
      addCss('viaChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.afectado.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'afectadoChart'+conten);
        addCss('afectadoChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.afectado[i]);
    }
    if(arr.length>0){
      chart(arr,1,'afectadoChart'+conten);
      addCss('afectadoChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.otro.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'otroChart'+conten);
        addCss('otroChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.otro[i]);
    }
    if(arr.length>0){
      chart(arr,1,'otroChart'+conten);
      addCss('otroChart'+conten);
      conten=1;
      arr=[];
    }
  },'json').fail(function(err){
    console.log(err);
  });
});

//fin button

$('#Fin').on('click',function(e){
  e.preventDefault();
  clean();
  $('#final').show();
  /*let postdata={
    id:dato['id'],
    i:exinplusign
  };*/
  $.post('/general/genFinal',null,function(resp,status){
    console.log(resp);
    //intermedioTabla2
    llenarTab(resp.tabla,4,'finalTabla');
    let arr=[];
    let conten=1;
    for (let i = 0,j=0; i < resp.incidente.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'incChart'+conten);
        addCss('incChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.incidente[i]);
    }
    if(arr.length>0){
      chart(arr,1,'incChart'+conten);
      addCss('incChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.medico.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'medChart'+conten);
        addCss('medChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.medico[i]);
    }
    if(arr.length>0){
      chart(arr,1,'medChart'+conten);
      addCss('medChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.fatal.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'fatChart'+conten);
        addCss('fatChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.fatal[i]);
    }
    if(arr.length>0){
      chart(arr,1,'fatChart'+conten);
      addCss('fatChart'+conten);
      conten=1;
      arr=[];
    }
    chart(resp.ruta,2,'accRutaChart');
    addCss('accRutaChart');

  },'json').fail(function(err){
    console.log(err);
  });
});
