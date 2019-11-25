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
                  +'<li><a href="#" id="'+i+'controlar" data-toggle="modal"><i class="fa fa-circle-o"></i>Controlar estado del camion</a></li>'
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
          $('#expocision').show();
          $.post('/camion/autoT',{id:id},function(resp,status){
            console.log(resp);
            llenarchart(resp.data.km,2,'DonutKmRecorrido');
            llenarchart(resp.data.expocision,2,'DonutHoraCant');
            llenarchart(resp.data.km,2,'DonutViajeCant');
            llenarchart(resp.data.frecuencia,3,'DonutFrecViaje');
          },'json').fail(function(err){
            console.log(err);
          });
          $.post('/camion/generalExpocision',{id:id},function(resp,status){
            console.log(resp);
            let dataExpo=[{
              desc:'Cantidad de kilometro recorrido',
              total:resp.data[0]
            },{
              desc:'Total horas de exposicion',
              total:resp.data[1]
            },{
              desc:'Cantidad de viajes',
              total:resp.data[2]
            }];
            llenarchart(dataExpo,1,'ChartExposicion')
          },'json').fail(function(err){
            console.log(err);
          });
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
          //llenar form
          let dataIncidente='Fallas electricas,Fallas en el motor,Problemas en la caja,'
          +'Problemas en la caja,Problemas en los globos,Problemas en el compresor de aire,'
          +'Problemas en los ejes,Problemas con la manguera de aire,Problemas con el radiador,'
          +'Problemas en los muelles,Problemas en el alternador,Fallas en las crucetas,Problemas en los frenos,'
          +'Problemas en la bomba,Problemas en la corona,Problemas en el turbo,Problemas en los rodamientos,'
          +'Problemas con la correa,Problemas en el tanque de combustible,Problemas en el chasis,Problemas en los inyectores,'
          +'Problemas de direccion';
          $(addcheck(dataIncidente)).appendTo('#addIncidente');
          //llenar form
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

        //controlar estado del camion
        $('#'+i+'controlar').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          limpiar();
          $.get( "/general/control/"+dato['id'], function(resp) {
            console.log(resp);
            if(resp.control){
              $('#controlForm1').hide();
            }else{
              $('#controlForm2').hide();
            }
          });
          $('#control').show();
          $.post('/camion/autoMes',{id:dato['id']},function(resp,status){
            console.log(resp);
            llenarTablas(resp.data,5);
          },'json').fail(function(err){
            console.log(err);
          });
        });
        //controlar estado del camion fin
      }
  });
});
