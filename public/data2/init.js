$(document).ready(function () {
  //$('#example1').DataTable();
  clean();
  inicializar();
  $('#map').show();
  $.get('/general',null,function(response){
      $("#map").googleMap({
        zoom: 8, // Initial zoom level (optional)
        coords: [-19.578297, -65.758633], // Map center (optional)
        type: "ROADMAP" // Map type (optional)
      });
      for(let i=0;i<response.length;i++){
        let dato=response[i];
        $("#map").addMarker({
          coords: [parseFloat(dato['lat']),parseFloat(dato['lon'])], // GPS coords
            //coords: [dato['lat'],dato['lon']],
            //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
            //id: 'marker1', // Unique ID for your marker
          title:dato['lugar'],
          icon:'/fonts/icons/camion4.png',
          text:'<b>Lorem ipsum</b> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        });
      }

  });
});
