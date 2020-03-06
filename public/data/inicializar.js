function inicializar(){
  let dateObj={
      "locale": {
          "format": "MM/DD/YYYY",
          "separator": " - ",
          "applyLabel": "Aplicar",
          "cancelLabel": "Cancelar",
          "fromLabel": "De",
          "toLabel": "a",
          "customRangeLabel": "Personaliza",
          "daysOfWeek": [
              "Do",
              "Lu",
              "Ma",
              "Mi",
              "Ju",
              "Vi",
              "Sa"
          ],
          "monthNames": [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre"
          ],
          "firstDay": 1
      }
    }
  //Date picker
  $('#ext3').datepicker({
    autoclose: true
  });
  $('#fechaDesvCon').datepicker({
    autoclose: true
  });
  $('#fechaDesvCam').datepicker({
    autoclose: true
  });
  $('#fechaAfecVia').datepicker({
    autoclose: true
  });
  $('#fechaProbVia').datepicker({
    autoclose: true
  });
  $('#fechaFactExt').datepicker({
    autoclose: true
  });
  $('#fechaIncidente').datepicker({
    autoclose: true
  });
  $('#fechaAccidente').datepicker({
    autoclose: true
  });
  $('#fechaMedica').datepicker({
    autoclose: true
  });

  //iCheck for checkbox and radio inputs
  $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass   : 'iradio_minimal-blue'
  });
  //Red color scheme for iCheck
  $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass   : 'iradio_minimal-red'
  });
  //Flat red color scheme for iCheck
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass   : 'iradio_flat-green'
  });
  $('.select2').select2();
  $('#reservation').daterangepicker(dateObj);
  $('#fechaIncidenteChart').daterangepicker(dateObj);
  $('#fechaIncidenteDonut').daterangepicker(dateObj);
  $('#controlReservation').daterangepicker(dateObj);
  $('#fechaKmRecorrido').daterangepicker(dateObj);
  $('#fechaHoraCant').daterangepicker(dateObj);
  $('#fechaViajeCant').daterangepicker(dateObj);
  $('#fechaFrecViaje').daterangepicker(dateObj);
  $('#fechaChartExposicion').daterangepicker(dateObj);
  $('#fechaExceso').daterangepicker(dateObj);
  $('#fechaHorario').daterangepicker(dateObj);
  $('#fechaDonutDesvio').daterangepicker(dateObj);
  $('#fechaDonutFrecVia').daterangepicker(dateObj);
  $('#fechaDonutfrecViaAf').daterangepicker(dateObj);
  $('#fechaFactExtDonut').daterangepicker(dateObj);
  $('#fechaChartIntermedio').daterangepicker(dateObj);
  $('#fechaRuta').daterangepicker(dateObj);
  $('#fechaAccKmChart').daterangepicker(dateObj);
  $('#fechaDonutDesvioCam').daterangepicker(dateObj);
  $('#fechaDonutMedico').daterangepicker(dateObj);
  $('#fechaFatal').daterangepicker(dateObj);
  $('#fechaGeneralFinal').daterangepicker(dateObj);
  //puebas en los charts
  //end chart
}

function updateMapa(){
  $("#mapVista").googleMap();
  mapCss('mapVista');
  $.ajax({
    url: '/general/mapaUp',
    headers: {
        'token':''
    },
    method: 'GET',
    dataType: 'json',
    data: null,
    success: function(resp){
      console.log(resp);
      resp.data.forEach((dato, i) => {
        $("#mapVista").addMarker({
          coords: [parseFloat(dato['lat']),parseFloat(dato['lon'])], // GPS coords
          title:dato['placa'],
          icon:'/fonts/icons/camion4.png',
          text:dato['ruta']
        });
      });
      removeCharge('mapCharge');
    }
  });
}

function updateIntermedio(){

  $('#tablaExViaje').empty();
  $('#tablaHoViaje').empty();
  $('#tablaDesvCam').empty();
  $('#tablaProbVia').empty();
  $('#tablaAfecVia').empty();
  $('#tablaFactExt').empty();
  $('#tablaDesvCond').empty();

  addCharge('exceCharge');
  addCharge('horarioCharge');
  addCharge('desvioCharge');
  addCharge('desvCamCharge');
  addCharge('viaCharge');
  addCharge('viaAfecCharge');
  addCharge('factCharge');

  addCharge('tabExCharge');
  addCharge('tabhorCharge');
  addCharge('tabDesvCharge');
  addCharge('tabDesvCamCharge');
  addCharge('tabViaCharge');
  addCharge('tabProbViaCharge');
  addCharge('tabFactCharge');

  $.post('/camion/intermedioTotal',{id:id},function(resp,status){
    console.log(resp);
    llenarchart(resp.exceso,2,'DonutExceso');
    removeCharge('exceCharge');
    llenarchart(resp.horario,2,'DonutHorario');
    removeCharge('horarioCharge');
    llenarTablas(resp.exceso,9);
    removeCharge('tabExCharge');
    llenarTablas(resp.horario,10);
    removeCharge('tabhorCharge');
    llenarchart(resp.desvio,2,'DonutDesvio');
    removeCharge('desvioCharge');
    llenarTablas(resp.desvtab,11);
    removeCharge('tabDesvCharge');
    llenarchart(resp.desviocamion,2,'DonutDesvioCam');
    removeCharge('desvCamCharge');
    llenarTablas(resp.desvcamtab,12);
    removeCharge('tabDesvCamCharge');
    llenarchart(resp.via,2,'DonutFrecVia');
    removeCharge('viaCharge');
    llenarTablas(resp.viatab,13);
    removeCharge('tabViaCharge');
    llenarchart(resp.viaje,2,'DonutFrecViaAf');
    removeCharge('viaAfecCharge');
    llenarTablas(resp.viajetab,14);
    removeCharge('tabProbViaCharge');
    llenarchart(resp.otro,2,'FactExtDonut');
    removeCharge('factCharge');
    llenarTablas(resp.otrotab,15);
    removeCharge('tabFactCharge');
    addCss('DonutExceso');
    addCss('DonutHorario');
    addCss('DonutDesvio');
    addCss('DonutDesvioCam');
    addCss('DonutFrecVia');
    addCss('DonutFrecViaAf');
    addCss('FactExtDonut');
  },'json').fail(function(err){
    console.log(err);
  });
  addCharge('generalIntermedioCharge');
  $.post('/camion/generalIntermedio',{id:id},function(resp,status){
    console.log(resp);
    let chartData1=[{desc:'total excesos de velocidad',total:resp.data[0]},
                    {desc:'total faltas de horario de conduccion',total:resp.data[1]}];
    let chartData2=[{desc:'total desvios conductor',total:resp.data[2]},
                    {desc:'total de problemas en las vias',total:resp.data[3]},
                    {desc:'total viajes afectados por problemas en las vias',total:resp.data[4]},
                    {desc:'total desvios por factores externos',total:resp.data[6]},];
    llenarchart(chartData1,1,'ChartIntermedio');
    llenarchart(chartData2,1,'ChartIntermedio2');
    addCss('ChartIntermedio');
    addCss('ChartIntermedio2');
    removeCharge('generalIntermedioCharge');
  },'json').fail(function(err){
    console.log(err);
  });
}

function updateFinal(){
  $('#tablaPorcInc').empty();
  $('#tablaPorAcc').empty();
  $('#tablaAccMed').empty();
  $('#tablaPorRut').empty();

  addCharge('incCharge');
  addCharge('fatalCharge');
  addCharge('medicoCharge');
  addCharge('rutaCharge');
  addCharge('accKmCharge');

  addCharge('tabIncCharge');
  addCharge('tabfatCharge');
  addCharge('tabMedCharge');
  addCharge('tabRutCharge');

  $.post('/camion/finalTotal',{id:id},function(resp,status){
    console.log(resp);
    llenarchart(resp.incidente,2,'incidenteChartDonut');
    removeCharge('incCharge');
    llenarTablas(resp.inctab,16);
    removeCharge('tabIncCharge');
    llenarchart(resp.fatal,2,'FatalChartDonut');
    removeCharge('fatalCharge');
    llenarTablas(resp.fattab,17);
    removeCharge('tabfatCharge');
    llenarchart(resp.medico,2,'DonutMedico');
    removeCharge('medicoCharge');
    llenarTablas(resp.medtab,18);
    removeCharge('tabMedCharge');
    llenarchart(resp.ruta,3,'DonutRuta');
    removeCharge('rutaCharge');
    llenarTablas(resp.acc,19);
    removeCharge('tabRutCharge');
    llenarchart(resp.km,4,"AccKmChart");
    removeCharge('accKmCharge');
    addCss('incidenteChartDonut');
    addCss('FatalChartDonut');
    addCss('DonutMedico');
    addCss('DonutRuta');
    addCss('AccKmChart');
    //"AccKmChart"
  },'json').fail(function(err){
    console.log(err);
  });
  addCharge('generalFinalCharge');
  $.post('/camion/generalFinal',{id:id},function(resp,status){
    console.log(resp);
    llenarchart(resp.data,1,'indicadorGeneralFinal');
    addCss('indicadorGeneralFinal');
    //"AccKmChart"
    removeCharge('generalFinalCharge');
  },'json').fail(function(err){
    console.log(err);
  });
}
