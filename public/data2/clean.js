function clean(){
  $('#expocision').hide();
  $('#intermedio').hide();
  $('#final').hide();
  $('#home').hide();
  $('#editar').hide();
  $('#headerDesc').empty();
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
function llenarBodyPerfil(id,data){
  $('#'+id).empty();
  $('<h3 class="profile-username text-center">'+data.nombre+'</h3>'
    +'<p class="text-muted text-center">Administrador</p>'
    +'<ul class="list-group list-group-unbordered">'
    +'<li class="list-group-item">'
    +'Nombre: <b>'+data.nombre+'</b>'
    +'</li>'
    +'<li class="list-group-item">'
    +'Apellido: <b>'+data.apellido+'</b>'
    +'</li>'
    +'<li class="list-group-item">'
    +'Email: <b>'+data.email+'</b>'
    +'</li>'
    +'</ul>').appendTo('#'+id);
}

function actualizarMapa(){
  addCharge('mapCharge');
  mapCss('mapHome');
  $.ajax({
    url: '/general/actualizar',
    headers: {
        'token':token
    },
    method: 'GET',
    dataType: 'json',
    data:null,
    success: function(resp){
      console.log(resp);
      removeCharge('mapCharge');
      $("#mapHome").empty();
      $("#mapHome").googleMap();
      resp.data.forEach(dato=> {
        $("#mapHome").addMarker({
          coords: [parseFloat(dato['lat']),parseFloat(dato['lon'])], // GPS coords
            //coords: [dato['lat'],dato['lon']],
            //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
            //id: 'marker1', // Unique ID for your marker
          title:dato['placa'],
          icon:'/fonts/icons/camion4.png',
          text:dato['lugar']
        });
      });
    }
  });
}

var tamMax=8;
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
