$(document).ready(function () {
  //$('#example1').DataTable();
  clean();
  $('<h1>Vera Cruz s.r.l.<small>Ubicación de camiones registrados en Monet</small></h1>').appendTo('#headerDesc');
  inicializar();
  addCharge('mapCharge');
  $.get('/general',null,function(response){
      removeCharge('mapCharge');
      $('#home').show();
      $("#mapHome").googleMap();
      mapCss('mapHome');
      for(let i=0;i<response.length;i++){
        let dato=response[i];
        $("#mapHome").addMarker({
          coords: [parseFloat(dato['lat']),parseFloat(dato['lon'])], // GPS coords
            //coords: [dato['lat'],dato['lon']],
            //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
            //id: 'marker1', // Unique ID for your marker
          title:dato['placa'],
          icon:'/fonts/icons/camion4.png',
          text:dato['lugar']
        });
      }

  });
});
