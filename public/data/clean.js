function limpiar(){
  exinplusign=0;
  $('#map').show();
  $('#tablaExt').hide();
  $('#formExtint').hide();
  $('#dateRange').hide();
  $('#excesosDiv').hide();
  $('#horarioDiv').hide();
  $('#estadisticas').hide();
  $('#intermedio').hide();
  $('#estadisticas3').hide();
  $('#control').hide();
  $('#expocision').hide();
  $('#controlForm1').show();
  $('#controlForm2').show();
  $('#contenidoExceso').empty();
  $('#contenidoHorario').empty();
  $('#tablaEstadistica3').empty()
  $('#bodyExt').empty();
  $('#incidenteChart').empty();
  $('#incidenteChartDonut').empty();
  $('#incidenteChart').empty();
  $('#addIncidente').empty();
  $('#controlBodyTable').empty();
  $('#DonutKmRecorrido').empty();
  $('#DonutHoraCant').empty();
  $('#DonutViajeCant').empty();
  $('#DonutFrecViaje').empty();
  $('#ChartExposicion2').empty();
  $('#ChartExposicion1').empty();
  $('#ChartExposicion').empty();
  $('#tablaRutaViaje').empty();
  $('#tablaExposicion').empty();
  $('#tablaKmViaje').empty();
  $('#addFormCond').empty();
  $('#addFormCam').empty();
  $('#addProbVia').empty();
  $('#addProbViaAf').empty();
  $('#addFormFactExt').empty();
  $('#DonutExceso').empty();
  $('#DonutHorario').empty();
  $('#DonutDesvio').empty();
  $('#DonutDesvioCam').empty();
  $('#DonutFrecVia').empty();
  $('#DonutFrecViaAf').empty();
  $('#FactExtDonut').empty();
  $('#ChartIntermedio').empty();
  $('#ChartIntermedio2').empty();

  //$('#map').googleMap();
  $("#map").googleMap({
    zoom: 8, // Initial zoom level (optional)
    coords: [-19.578297, -65.758633], // Map center (optional)
    type: "ROADMAP" // Map type (optional)
  });
}
