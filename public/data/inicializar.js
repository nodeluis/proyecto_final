function inicializar(){
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
  $('#reservation').daterangepicker();
  $('#fechaIncidenteChart').daterangepicker();
  $('#fechaIncidenteDonut').daterangepicker();
  $('#controlReservation').daterangepicker();
  $('#fechaKmRecorrido').daterangepicker();
  $('#fechaHoraCant').daterangepicker();
  $('#fechaViajeCant').daterangepicker();
  $('#fechaFrecViaje').daterangepicker();
  $('#fechaChartExposicion').daterangepicker();

  //puebas en los charts
  //end chart
}
