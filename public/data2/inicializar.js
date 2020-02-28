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
  /*$('#on').datepicker({
    autoclose: true
  });*/

  $('#kmFecha').daterangepicker(dateObj);
  $('#horFecha').daterangepicker(dateObj);
  $('#viajeFecha').daterangepicker(dateObj);
  $('#rutaFecha').daterangepicker(dateObj);

  $('#exFecha').daterangepicker(dateObj);
  $('#horarioFecha').daterangepicker(dateObj);
  $('#desvFecha').daterangepicker(dateObj);
  $('#desvCamFecha').daterangepicker(dateObj);
  $('#viaFecha').daterangepicker(dateObj);
  $('#afectadoFecha').daterangepicker(dateObj);
  $('#otroFecha').daterangepicker(dateObj);

  $('#incFecha').daterangepicker(dateObj);
  $('#medFecha').daterangepicker(dateObj);
  $('#fatFecha').daterangepicker(dateObj);
  $('#accRutaFecha').daterangepicker(dateObj);
  $('#accKmFecha').daterangepicker(dateObj);

  //puebas en los charts
  //end chart
}
