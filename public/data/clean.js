function limpiar(){
  exinplusign=0;
  $('#vista').hide();
  $('#contExt').hide();
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
  $('#tablaExViaje').empty();
  $('#tablaHoViaje').empty();
  $('#tablaDesvCam').empty();
  $('#tablaProbVia').empty();
  $('#tablaAfecVia').empty();
  $('#tablaFactExt').empty();
  $('#tablaDesvCond').empty();
  $('#tablaPorcInc').empty();
  $('#tablaPorAcc').empty();
  $('#tablaAccMed').empty();
  $('#tablaPorRut').empty();
  $('#indicadorGeneralFinal').empty();
  //$('#map').googleMap();
}

function addCss(id){
  $('#'+id).css({
    "width": "100%",
    "height": "300px"
  });
}


function mapCss(id){
  $('#'+id).css({
    "width": "100%",
    "height": "400px"
  });
}

function addCharge(id){
  $('#'+id).addClass('overlay');
  $('<i class="fa fa-refresh fa-spin"></i>').appendTo('#'+id);
}

function removeCharge(id){
  $('#'+id).removeClass('overlay');
  $('#'+id).empty();
}

var dataTableLenguaje={
language: {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
    "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
    }
  }
};
