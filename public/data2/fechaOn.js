//expocision click
$('#kmFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#kmFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:1
  };
  addCharge('kmCharge');
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    removeCharge('kmCharge');
    let arr=[];
    let conten=1;
    $('#kmChart1','#kmChart2','#kmChart3','#kmChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#horFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#horFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:2
  };
  addCharge('horCharge');
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    removeCharge('horCharge');
    let arr=[];
    let conten=1;
    $('#horChart1','#horChart2','#horChart3','#horChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#viajeFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#viajeFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:3
  };
  addCharge('viajeCharge');
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    removeCharge('viajeCharge');
    let arr=[];
    let conten=1;
    $('#viajeChart1','#viajeChart2','#viajeChart3','#viajeChart4').empty();
    for (let i = 0,j=0; i < resp.cant.length; i++,j=(j<tamMax?j+1:0)) {
      if(j==tamMax){
        chart(arr,1,'viajeChart'+conten);
        addCss('viajeChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.cant[i]);
    }
    if(arr.length>0){
      chart(arr,1,'viajeChart'+conten);
      addCss('viajeChart'+conten);
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#rutaFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#rutaFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:4
  };
  addCharge('rutaCharge');
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    removeCharge('rutaCharge');
    $('#rutaChart').empty();
    chart(resp.frec,2,'rutaChart');
    addCss('rutaChart');
  },'json').fail(function(err){
    console.log(err);
  });
});

//intermedios click

$('#exFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#exFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:1
  };
  addCharge('exCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('exCharge');
    let arr=[];
    let conten=1;
    $('#exChart1','#exChart2','#exChart3','#exChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#horarioFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#horarioFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:2
  };
  addCharge('horarioCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('horarioCharge');
    let arr=[];
    let conten=1;
    $('#horarioChart1','#horarioChart2','#horarioChart3','#horarioChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#desvFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#desvFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:3
  };
  addCharge('desvCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('desvCharge');
    let arr=[];
    let conten=1;
    $('#desvChart1','#desvChart2','#desvChart3','#desvChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#desvCamFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#desvCamFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:4
  };
  addCharge('desvCamCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('desvCamCharge');
    let arr=[];
    let conten=1;
    $('#desvCamChart1','#desvCamChart2','#desvCamChart3','#desvCamChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#viaFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#viaFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:5
  };
  addCharge('viaCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('viaCharge');
    let arr=[];
    let conten=1;
    $('#viaChart1','#viaChart2','#viaChart3','#viaChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#afectadoFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#afectadoFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:6
  };
  addCharge('afectadoCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('afectadoCharge');
    let arr=[];
    let conten=1;
    $('#afectadoChart1','#afectadoChart2','#afectadoChart3','#afectadoChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#otroFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#otroFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:7
  };
  addCharge('otroCharge');
  $.post('/general/genIntermedio',postdata,function(resp,status){
    console.log(resp);
    removeCharge('otroCharge');
    let arr=[];
    let conten=1;
    $('#otroChart1','#otroChart2','#otroChart3','#otroChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});

//final click

$('#incFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#incFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:1
  };
  addCharge('incCharge');
  $.post('/general/genFinal',postdata,function(resp,status){
    console.log(resp);
    removeCharge('incCharge');
    let arr=[];
    let conten=1;
    $('#incChart1','#incChart2','#incChart3','#incChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#medFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#medFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:2
  };
  addCharge('medCharge');
  $.post('/general/genFinal',postdata,function(resp,status){
    console.log(resp);
    removeCharge('medCharge');
    let arr=[];
    let conten=1;
    $('#medChart1','#medChart2','#medChart3','#medChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#fatFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fatFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:3
  };
  addCharge('fatCharge');
  $.post('/general/genFinal',postdata,function(resp,status){
    console.log(resp);
    removeCharge('fatCharge');
    let arr=[];
    let conten=1;
    $('#fatChart1','#fatChart2','#fatChart3','#fatChart4').empty();
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
    }
  },'json').fail(function(err){
    console.log(err);
  });
});
$('#accRutaFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#accRutaFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:4
  };
  addCharge('accRutaCharge');
  $.post('/general/genFinal',postdata,function(resp,status){
    console.log(resp);
    removeCharge('accRutaCharge');
    let arr=[];
    let conten=1;
    $('#accRutaChart').empty();
    chart(resp.ruta,2,'accRutaChart');
    addCss('accRutaChart');
  },'json').fail(function(err){
    console.log(err);
  });
});

$('#accKmFechaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#accKmFecha').val();
  let envio=fech.split(' - ');
  let postdata={
    fi:envio[0],
    ff:envio[1],
    filtro:5
  };
  addCharge('accKmCharge');
  $.post('/general/genFinal',postdata,function(resp,status){
    console.log(resp);
    removeCharge('accKmCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
