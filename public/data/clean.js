function limpiar(){
  exinplusign=0;
  $('#map').show();
  $('#tablaExt').hide();
  $('#formExtint').hide();
  $('#dateRange').hide();
  $('#excesosDiv').hide();
  $('#horarioDiv').hide();
  $('#estadisticas').hide();
  $('#estadisticas2').hide();
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
  //$('#map').googleMap();
  $("#map").googleMap({
    zoom: 8, // Initial zoom level (optional)
    coords: [-19.578297, -65.758633], // Map center (optional)
    type: "ROADMAP" // Map type (optional)
  });
}
