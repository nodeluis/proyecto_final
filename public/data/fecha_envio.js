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

//fechas expocision
//kilometros por viaje
$('#fechaKmRecorridoEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaKmRecorrido').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1],
    filtro:3
  };
  addCharge('kmRecorridoCharge');
  $.post('/camion/auto',postdata,function(resp,status){
    console.log(resp);
    $('#DonutKmRecorrido').empty();
    $('#tablaKmViaje').empty();
    llenarchart(resp.data,2,'DonutKmRecorrido');
    llenarTablas(resp.data,6);
    removeCharge('kmRecorridoCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});

//horas de expocision
$('#fechaHoraCantEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaHoraCant').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1],
    filtro:4
  };
  addCharge('horaDonutCharge');
  $.post('/camion/auto',postdata,function(resp,status){
    console.log(resp);
    $('#DonutHoraCant').empty();
    $('#tablaExposicion').empty();
    llenarchart(resp.data,2,'DonutHoraCant');
    llenarTablas(resp.data,7);
    removeCharge('horaDonutCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//cantidad de viajes por ruta mes
$('#fechaFrecViajeEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaFrecViaje').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1],
    filtro:6
  };
  addCharge('frecViajeCharge');
  $.post('/camion/auto',postdata,function(resp,status){
    console.log(resp);
    $('#DonutFrecViaje').empty();
    $('#tablaRutaViaje').empty();
    llenarchart(resp.data,3,'DonutFrecViaje');
    llenarTablas(resp.data,8);
    removeCharge('frecViajeCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//general expocision
$('#fechaChartExposicionEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaChartExposicion').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('generalExpoCharge');
  $.post('/camion/generalExpocision',postdata,function(resp,status){
    console.log(resp);
    $('#ChartExposicion').empty();
    $('#ChartExposicion1').empty();
    $('#ChartExposicion2').empty();
    llenarchart([{
      desc:'Cantidad de kilometro recorrido',
      total:resp.data[0]
    }],1,'ChartExposicion');
    llenarchart([{
      desc:'Total horas de exposicion',
      total:resp.data[1]
    }],1,'ChartExposicion1');
    llenarchart([{
      desc:'Cantidad de viajes',
      total:resp.data[2]
    }],1,'ChartExposicion2');
    removeCharge('generalExpoCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});

//fechas intermedio
//exceso de velocidad por viaje
$('#fechaExcesoEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaExceso').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1],
    filtro:1
  };
  addCharge('exceCharge');
  $.post('/camion/auto',postdata,function(resp,status){
    console.log(resp);
    $('#DonutExceso').empty();
    $('#tablaExViaje').empty();
    llenarchart(resp.data,2,'DonutExceso');
    llenarTablas(resp.data,9);
    removeCharge('exceCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//horarios de conduccion inhapropiados
$('#fechaHorarioEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaHorario').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1],
    filtro:2
  };
  addCharge('horarioCharge');
  $.post('/camion/auto',postdata,function(resp,status){
    console.log(resp);
    $('#DonutHorario').empty();
    $('#tablaHoViaje').empty();
    llenarchart(resp.data,2,'DonutHorario');
    llenarTablas(resp.data,10);
    removeCharge('horarioCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//desvio mes
$('#fechaDonutDesvioEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaDonutDesvio').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('desvioCharge');
  $.post('/camion/desvioMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutDesvio').empty();
    $('#tablaDesvCond').empty();
    llenarchart(resp.data2,2,'DonutDesvio');
    llenarTablas(resp.data1,11);
    removeCharge('desvioCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//desvio mes camion
$('#fechaDonutDesvioCamEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaDonutDesvioCam').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('desvCamCharge');
  $.post('/camion/desvioCamionMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutDesvioCam').empty();
    $('#tablaDesvCam').empty();
    llenarchart(resp.data2,2,'DonutDesvioCam');
    llenarTablas(resp.data1,12);
    removeCharge('desvCamCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//frec via por meses
$('#fechaDonutFrecViaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaDonutFrecVia').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('viaCharge');
  $.post('/camion/viaMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutFrecVia').empty();
    $('#tablaProbVia').empty();
    llenarchart(resp.data2,2,'DonutFrecVia');
    llenarTablas(resp.data1,13);
    removeCharge('viaCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//frec via afectado por meses
$('#fechaDonutfrecViaAfEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaDonutfrecViaAf').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('viaAfecCharge');
  $.post('/camion/viajeAfectadoMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutFrecViaAf').empty();
    $('#tablaAfecVia').empty();
    llenarchart(resp.data2,2,'DonutFrecViaAf');
    llenarTablas(resp.data1,14);
    removeCharge('viaAfecCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//fac externo problema mes
$('#fechaFactExtDonutEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaFactExtDonut').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('factCharge');
  $.post('/camion/otroMes',postdata,function(resp,status){
    console.log(resp);
    $('#FactExtDonut').empty();
    $('#tablaFactExt').empty();
    llenarchart(resp.data2,2,'FactExtDonut');
    llenarTablas(resp.data1,15);
    removeCharge('factCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//general intermedio
$('#fechaChartIntermedioEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaChartIntermedio').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('generalIntermedioCharge');
  $.post('/camion/generalIntermedio',postdata,function(resp,status){
    console.log(resp);
    let chartData1=[{desc:'total excesos de velocidad',total:resp.data[0]},
                    {desc:'total faltas de horario de conduccion',total:resp.data[1]}];
    let chartData2=[{desc:'total desvios conductor',total:resp.data[2]},
                    {desc:'total de problemas en las vias',total:resp.data[3]},
                    {desc:'total viajes afectados por problemas en las vias',total:resp.data[4]},
                    {desc:'total desvios por factores externos',total:resp.data[6]},];
    $('#ChartIntermedio').empty();
    $('#ChartIntermedio2').empty();
    llenarchart(chartData1,1,'ChartIntermedio');
    llenarchart(chartData2,1,'ChartIntermedio2');
    removeCharge('generalIntermedioCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//fecha indicadores finales
//incidente fecha
$('#fechaIncidenteDonutEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaIncidenteDonut').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('incCharge');
  $.post('/camion/incidenteMes',postdata,function(resp,status){
    console.log(resp);
    $('#incidenteChartDonut').empty();
    $('#tablaPorcInc').empty();
    llenarchart(resp.data2,2,'incidenteChartDonut');
    llenarTablas(resp.data1,16);
    removeCharge('incCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//accidente con fatalidades mes
$('#fechaFatalEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaFatal').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('fatalCharge');
  $.post('/camion/fatalMes',postdata,function(resp,status){
    console.log(resp);
    $('#FatalChartDonut').empty();
    $('#tablaPorAcc').empty();
    llenarchart(resp.data2,2,'FatalChartDonut');
    llenarTablas(resp.data1,17);
    removeCharge('fatalCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//accidente con baja medica mes
$('#fechaDonutMedicoEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaDonutMedico').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('medicoCharge');
  $.post('/camion/medicoMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutMedico').empty();
    $('#tablaAccMed').empty();
    llenarchart(resp.data2,2,'DonutMedico');
    llenarTablas(resp.data1,18);
    removeCharge('medicoCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//accidente por rutas mes
$('#fechaRutaEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaRuta').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('rutaCharge');
  $.post('/camion/accidenteRutaMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutRuta').empty();
    $('#tablaPorRut').empty();
    llenarchart(resp.chart,3,'DonutRuta');
    llenarTablas(resp.falta,19);
    removeCharge('rutaCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});
//general final mes
$('#fechaGeneralFinalEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#fechaGeneralFinal').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  addCharge('generalFinalCharge');
  $.post('/camion/generalFinal',postdata,function(resp,status){
    console.log(resp);
    $('#indicadorGeneralFinal').empty();
    llenarchart(resp.data,1,'indicadorGeneralFinal');
    removeCharge('generalFinalCharge');
  },'json').fail(function(err){
    console.log(err);
  });
});

/*//control estado del camion
$('#controlReservationEnv').on('click',function(e){
  e.preventDefault();
  let fech=$('#controlReservation').val();
  let envio=fech.split(' - ');
  let postdata={
    id:id,
    fi:envio[0],
    ff:envio[1]
  };
  $.post('/camion/accidenteRutaMes',postdata,function(resp,status){
    console.log(resp);
    $('#DonutRuta').empty();
    $('#tablaPorRut').empty();
    llenarchart(resp.chart,3,'DonutRuta');
    llenarTablas(resp.falta,19);
  },'json').fail(function(err){
    console.log(err);
  });
});*/
