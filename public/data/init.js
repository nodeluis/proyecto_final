$(document).ready(function () {
  console.log('<%=token%>');
  inicializar();
  limpiar();
  $.get('/general',null,function(response){
      $("#map").googleMap({
        zoom: 8, // Initial zoom level (optional)
        coords: [-19.578297, -65.758633], // Map center (optional)
        type: "ROADMAP" // Map type (optional)
      });

      for(var i=0;i<response.length;i++){
        let dato=response[i];
        //ids.push(dato['_id']);
        $('<li id="'+i+'tree">'
                  +'<a href="#"><i id="'+i+'f1"></i><span>'+dato['placa']+'</span>'
                  +'<span id="'+i+'spa">'
                  +'<i id="'+i+'f2"></i>'
                  +'</span>'
                  +'</a>'
                  +'<ul id="'+i+'tremen">'
                  +'<li><a href="#" id="'+i+'hor"><i class="fa fa-circle-o"></i>Horarios de conducción</a></li>'
                  +'<li><a href="#"><i class="fa fa-circle-o"></i>Kilometros recorridos</a></li>'
                  +'<li class="treeview"><a href="#" id=""><i class="fa fa-circle-o"></i>Indicadores'
                  +'<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>'
                  +'<ul id="'+i+'tree2">'
                  +'<li><a href="#" id="'+i+'exposicion"><i class="fa fa-circle-o"></i>Exposicion</a></li>'
                  +'<li><a href="#" id="'+i+'intermedio"><i class="fa fa-circle-o"></i>Intermedios</a></li>'
                  +'<li><a href="#" id="'+i+'final"><i class="fa fa-circle-o"></i>Finales</a></li>'
                  +'</ul>'
                  +'</a></li>'
                  +'<li><a href="#"><i class="fa fa-circle-o"></i>Alcoholemia</a></li>'
                  +'<li><a href="#"><i class="fa fa-circle-o"></i>Botiquín</a></li>'
                  +'<li><a href="#" id="'+i+'ext"><i class="fa fa-circle-o"></i>Extintores</a></li>'
                  +'<li><a href="#" id="'+i+'exc"><i class="fa fa-circle-o"></i>excesos de velocidad</a></li>'
                  +'<li><a href="#" id="'+i+'cont"><i class="fa fa-circle-o"></i>Controlar estado del camion</a></li>'
                  +'</ul>'
                  +'</li>').appendTo('#incamion');
        $('#'+i+'tree').addClass('treeview');
        $('#'+i+'tree2').addClass('treeview-menu');
        $('#'+i+'f1').addClass('fa fa-bus');
        $('#'+i+'spa').addClass('pull-right-container');
        $('#'+i+'f2').addClass('fa fa-angle-left pull-right');
        $('#'+i+'tremen').addClass('treeview-menu');
        //insertando punto en el mapa
        if(dato['control']){
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
        //poner a la escucha y hacer operaciones
        //4232-ICI
        $('#'+i+'exc').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          daterangenvio=1;
          $("#map").googleMap({
            zoom: 8, // Initial zoom level (optional)
            coords: [-19.578297, -65.758633], // Map center (optional)
            type: "ROADMAP" // Map type (optional)
          });
          limpiar();
          let postdata={
            id:dato['id'],
            i:exinplusign
          };
          $.post('/camion/exceso2',postdata,function(resp,status){
            $('#excesosDiv').show();
            $('#dateRange').show();
            console.log(resp);
            llenarTablas(resp,1);
          },'json').fail(function(err){
            console.log(err);
          });
        });
        // horarios de conduccion
        $('#'+i+'hor').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          daterangenvio=2;
          $("#map").googleMap({
            zoom: 8, // Initial zoom level (optional)
            coords: [-19.578297, -65.758633], // Map center (optional)
            type: "ROADMAP" // Map type (optional)
          });
          limpiar();
          let postdata={
            id:dato['id'],
            i:exinplusign
          };
          $.post('/camion/horario',postdata,function(resp,status){
            $('#horarioDiv').show();
            $('#dateRange').show();
            console.log(resp);
            llenarTablas(resp,2);
          },'json').fail(function(err){
            console.log(err);
          });
        });
        // horarios de conduccion final
        // extintores

        $('#'+i+'ext').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          daterangenvio=3;
          limpiar();
          $('#map').hide();
          let postdata={
            id:dato['id'],
            i:exinplusign
          };
          $.post('/camion/dataextintor',postdata,function(resp,status){
            $('#dateRange').show();
            $('#formExtint').show();
            $('#tablaExt').show();
            console.log(resp);
            llenarTablas(resp,3);
          },'json').fail(function(err){
            console.log(err);
          });
        });
        // extintores final

        //Exposicion
        $('#'+i+'exposicion').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          limpiar();
          $('#map').hide();
          $('#estadisticas').show();
        });
        //Exposicion final

        //intermedios
        $('#'+i+'intermedio').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          limpiar();
          $('#map').hide();
          $('#estadisticas2').show();
        });
        //intermedios final

        //finales
        $('#'+i+'final').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          limpiar();
          $('#map').hide();
          $.post('/camion/vistaIncidente',{id:dato['id']},function(resp,status){
            $('#estadisticas3').show();
            console.log(resp);
            llenarTablas(resp.data1,4);
            llenarchart(resp.data2,2,'incidenteChartDonut');
          },'json').fail(function(err){
            console.log(err);
          });
          $.post('/camion/coleccionChartIncidente',{id:dato['id']},function(resp,status){
            console.log(resp);
            llenarchart(resp,1,'incidenteChart');
          },'json').fail(function(err){
            console.log(err);
          });
        });
        //finales final
      }

  });
});
