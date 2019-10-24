//botones de excesos de Velocidad
$('#enviarDateRange').on('click',function(e){
  e.preventDefault();
  limpiar();
  selectRequest(daterangenvio);
});

//botones exceso de velocidad fin

//boton incidente donut
$('#incidenteDonut').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaIncidenteDonut').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  console.log(envio);
  $.post('/camion/vistaIncidente',postdata,function(resp,status){
    console.log(resp);
    $('#incidenteChartDonut').empty();
    $('#tablaEstadistica3').empty();
    llenarTablas(resp.data1,4);
    llenarchart(resp.data2,2,'incidenteChartDonut');
  },'json').fail(function(err){
    console.log(err);
  });
});
//boton incidente donut final

//boton incidente chart
$('#incidenteTablaChart').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaIncidenteChart').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  $.post('/camion/coleccionChartIncidente',postdata,function(resp,status){
    console.log(resp);
    $('#incidenteChart').empty();
    llenarchart(resp,1,'incidenteChart');
  },'json').fail(function(err){
    console.log(err);
  });
});
//boton incidente chart final
