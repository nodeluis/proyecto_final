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
  addCharge('mapCharge');
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
