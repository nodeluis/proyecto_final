//button control
$('#control').on('click',function(e){
  e.preventDefault();
  var url='/veracruz2';
  $(location).attr('href',url);
});

//home veracruz

$('#veracruz').on('click',function(e){
  e.preventDefault();
  clean();
  $('<h1>Vera Cruz s.r.l.<small>Ubicación de camiones registrados en Monet</small></h1>').appendTo('#headerDesc');
  $('#home').show();
});

//expocision button
$('#Exp').on('click',function(e){
  e.preventDefault();
  clean();
  $('<h1>Indicadores generales de exposición<small>Estadisticas de cada camion</small></h1>').appendTo('#headerDesc');
  $('#expocision').show();
  addCharge('expoTabCharge');
  addCharge('kmCharge');
  addCharge('horCharge');
  addCharge('viajeCharge');
  addCharge('rutaCharge');
  $.ajax({
    url: '/general/genExpocision',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: null,
    success: function(resp){
      console.log('este es el post con ajax');
      console.log(resp);
      $('#kmTabla').empty();
      llenarTab(resp.tabla,1,'kmTabla');
      removeCharge('expoTabCharge');
      $('#kmChart').empty();
      let arr=[];
      let conten=1;
      for (let i = 0,j=0; i < resp.km.length; i++,j=(j<tamMax?j+1:0)) {
        if(j==tamMax){
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
      $('#horChart').empty();
      removeCharge('kmCharge');
      for (let i = 0,j=0; i < resp.hora.length; i++,j=(j<tamMax?j+1:0)) {
        if(j==tamMax){
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
      $('#viajeChart').empty();
      removeCharge('horCharge');
      for (let i = 0,j=0; i < resp.cant.length; i++,j=(j<tamMax?j+1:0)) {
        if(j==tamMax){
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
      $('#rutaChart').empty();
      removeCharge('viajeCharge');
      chart(resp.frec,2,'rutaChart');
      addCss('rutaChart');
      removeCharge('rutaCharge');
    }
  });
});
//intermedio button
$('#Int').on('click',function(e){
  e.preventDefault();
  clean();
  $('<h1>Indicadores generales intermedios<small>Estadisticas de cada camion</small></h1>').appendTo('#headerDesc');
  $('#intermedio').show();
  addCharge('intermedioTabCharge');
  addCharge('intermedioTab2Charge');
  addCharge('exCharge');
  addCharge('horarioCharge');
  addCharge('desvCharge');
  addCharge('desvCamCharge');
  addCharge('viaCharge');
  addCharge('afectadoCharge');
  addCharge('otroCharge');
  $.post('/general/genIntermedio',null,function(resp,status){
    console.log(resp);

    $('#intermedioTabla1').empty();
    $('#intermedioTabla2').empty();
    llenarTab(resp.tab1,2,'intermedioTabla1');
    llenarTab(resp.tab2,3,'intermedioTabla2');
    removeCharge('intermedioTabCharge');
    removeCharge('intermedioTab2Charge');
    let arr=[];
    let conten=1;
    $('#exChart').empty();
    for (let i = 0,j=0; i < resp.exceso.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#horarioChart').empty();
    removeCharge('exCharge ');
    for (let i = 0,j=0; i < resp.horario.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#desvChart').empty();
    removeCharge('horarioCharge');
    for (let i = 0,j=0; i < resp.desvio.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#desvCamChart').empty();
    removeCharge('desvCharge');
    for (let i = 0,j=0; i < resp.desvioCam.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#viaChart').empty();
    removeCharge('desvCamCharge');
    for (let i = 0,j=0; i < resp.via.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#afectadoChart').empty();
    removeCharge('viaCharge');
    for (let i = 0,j=0; i < resp.afectado.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#otroChart').empty();
    removeCharge('afectadoCharge');
    for (let i = 0,j=0; i < resp.otro.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    removeCharge('otroCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});

//fin button

$('#Fin').on('click',function(e){
  e.preventDefault();
  clean();
  $('<h1>Indicadores generales finales<small>Estadisticas de cada camion</small></h1>').appendTo('#headerDesc');
  $('#final').show();
  addCharge('finTabCharge');
  addCharge('incCharge');
  addCharge('medCharge');
  addCharge('fatCharge');
  addCharge('accRutaCharge');
  addCharge('accKmCharge');
  $.post('/general/genFinal',null,function(resp,status){
    console.log(resp);
    $('#finalTabla').empty();
    llenarTab(resp.tabla,4,'finalTabla');
    removeCharge('finTabCharge');
    let arr=[];
    let conten=1;
    $('#incChart').empty();
    for (let i = 0,j=0; i < resp.incidente.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#medChart').empty();
    removeCharge('incCharge');
    for (let i = 0,j=0; i < resp.medico.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#fatChart').empty();
    removeCharge('medCharge');
    for (let i = 0,j=0; i < resp.fatal.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
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
    $('#accRutaChart').empty();
    removeCharge('fatCharge');
    chart(resp.ruta,2,'accRutaChart');
    addCss('accRutaChart');
    removeCharge('accRutaCharge');
    //accKmChart
    $('#accKmChart').empty();
    chart(resp.km,3,'accKmChart');
    addCss('accKmChart');
    removeCharge('accKmCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//perfil del usuario
$('#updateButton').on('click',function(e){
  e.preventDefault();
  clean();
  $('#editar').show();
});

$('#openPerfil').on('click',function(e){
  $.ajax({
    url: '/user/dato',
    headers: {
        'token':token
    },
    method: 'POST',
    dataType: 'json',
    data:{id:id},
    success: function(resp){
      console.log(resp);
      $('#formNombre').val(resp.nombre);
      $('#formApellido').val(resp.apellido);
      $('#formEmail').val(resp.email);
      llenarBodyPerfil('llenarPerfil',resp);
    }
  });
});

//formulario de actualizacion

$('#formUpdate').submit(function(e) {
  e.preventDefault();
  if($('#formPass2').val()==$('#formPass3').val()){
    let datap={
      nombre:$('#formNombre').val(),
      apellido:$('#formApellido').val(),
      email:$('#formEmail').val(),
      password:$('#formPass').val(),
      password2:$('#formPass2').val()
    }
    addCharge('editarCharge');
    $.ajax({
      url: '/user/'+id,
      headers: {
          'token':token
      },
      method: 'PATCH',
      dataType: 'json',
      data:datap,
      success: function(resp){
        removeCharge('editarCharge');
        console.log(resp);
      }
    });
    $(this).trigger("reset");
  }
});
