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
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    let arr=[];
    let conten=1;
    $('#kmChart1','#kmChart2','#kmChart3','#kmChart4').empty();
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
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    let arr=[];
    let conten=1;
    $('#horChart1','#horChart2','#horChart3','#horChart4').empty();
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
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    let arr=[];
    let conten=1;
    $('#viajeChart1','#viajeChart2','#viajeChart3','#viajeChart4').empty();
    for (let i = 0,j=0; i < resp.cant.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
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
  $.post('/general/genExpocision',postdata,function(resp,status){
    console.log(resp);
    $('#rutaChart').empty();
    chart(resp.frec,2,'rutaChart');
    addCss('rutaChart');
  },'json').fail(function(err){
    console.log(err);
  });
});
