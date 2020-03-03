$(document).ready(function () {
  inicializar();
  limpiar();
  $('#vista').show();
  $("#mapVista").googleMap();
  mapCss('mapVista');
  $.get('/general',null,function(response){
    for(var i=0;i<response.length;i++){
        let dato=response[i];

        if(dato.control==true){
          $("#mapVista").addMarker({
            coords: [parseFloat(dato['lat']),parseFloat(dato['lon'])], // GPS coords
            title:dato['placa'],
            icon:'/fonts/icons/camion4.png',
            text:dato['lugar']
          });
        }

        $('<li id="'+i+'tree">'
                  +'<a href="#"><i id="'+i+'f1"></i><span>'+dato['placa']+'</span>'
                  +'<span id="'+i+'spa">'
                  +'<i id="'+i+'f2"></i>'
                  +'</span>'
                  +'</a>'
                  +'<ul id="'+i+'tremen">'
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
        //poner a la escucha y hacer operaciones
        //4232-ICI
        // extintores

        $('#'+i+'ext').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          daterangenvio=3;
          limpiar();
          let postdata={
            id:dato['id'],
            i:exinplusign
          };
          $.post('/camion/dataextintor',postdata,function(resp,status){
            $('#contExt').show();
            console.log(resp);
            llenarTablas(resp.data,3);
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
          $('#expocision').show();
          $.post('/camion/autoT',{id:id},function(resp,status){
            console.log(resp);
            llenarchart(resp.data.km,2,'DonutKmRecorrido');
            llenarchart(resp.data.expocision,2,'DonutHoraCant');
            llenarchart(resp.data.km,2,'DonutViajeCant');
            llenarchart(resp.data.frecuencia,3,'DonutFrecViaje');
            llenarTablas(resp.data.km,6);
            llenarTablas(resp.data.expocision,7);
            llenarTablas(resp.data.frecuencia,8);
            addCss('DonutKmRecorrido');
            addCss('DonutHoraCant');
            addCss('DonutViajeCant');
            addCss('DonutFrecViaje');
          },'json').fail(function(err){
            console.log(err);
          });
          $.post('/camion/generalExpocision',{id:id},function(resp,status){
            console.log(resp);
            let dataExpo=[{
              desc:'Cantidad de kilometro recorrido',
              total:resp.data[0]
            }];
            llenarchart([{
              desc:'Cantidad de kilometro recorrido',
              total:resp.data[0]
            }],1,'ChartExposicion');
            llenarchart([{
              desc:'Total horas de exposicion',
              total:resp.data[1]
            }],1,'ChartExposicion1');
            llenarchart([{
              desc:'Cantidad de viajes',
              total:resp.data[2]
            }],1,'ChartExposicion2');
            addCss('ChartExposicion');
            addCss('ChartExposicion1');
            addCss('ChartExposicion2');
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
          $('#intermedio').show();
          let dataIncidente='No paro en el punto de control,Uso del equipo de proteccion personal,No fue inspeccionado,'
          +'No se reporto,Incumplimiento de horario en plan de viaje,Uso de cinturon de seguridad,'
          +'Estado de salud,Conductor sin descansar,Problemas con la documentacion,'
          +'Conductor alterado,Conductor con pasajero,Conductor que no conoce la ruta,Conductor nuevo,'
          +'Emision de reporte falso';
          $(addcheck(dataIncidente)).appendTo('#addFormCond');

          let dataIncidente2='Lider de convoy adelantado,GPS inactivo S/GPS,Estacionamiento inseguro,'
          +'Robos y hurtos,Uso de las luces de señalizacion,'
          +'Desvio de ruta sin autorizacion'
          +'Conductor alterado,Conductor con pasajero,Conductor que no conoce la ruta,Conductor nuevo,'
          +'Emision de reporte falso';
          $(addcheck(dataIncidente2)).appendTo('#addFormCam');

          let dataIncidente3='Plataforma con baches,Alto congestionamiento por trafico,'
          +'Tramo inestable / resbaladizo';
          $(addcheck(dataIncidente3)).appendTo('#addProbVia');

          let dataIncidente4='Zona geologicamente inestable,Cierre de ruta,'
          +'Bloqueo / manifestaciones';
          $(addcheck(dataIncidente4)).appendTo('#addProbViaAf');

          let dataIncidente5='Clima,Otro';
          $(addcheck(dataIncidente5)).appendTo('#addFormFactExt');

          $.post('/camion/intermedioTotal',{id:id},function(resp,status){
            console.log(resp);
            llenarchart(resp.exceso,2,'DonutExceso');
            llenarchart(resp.horario,2,'DonutHorario');
            llenarTablas(resp.exceso,9);
            llenarTablas(resp.horario,10);
            llenarchart(resp.desvio,2,'DonutDesvio');
            llenarTablas(resp.desvtab,11);
            llenarchart(resp.desviocamion,2,'DonutDesvioCam');
            llenarTablas(resp.desvcamtab,12);
            llenarchart(resp.via,2,'DonutFrecVia');
            llenarTablas(resp.viatab,13);
            llenarchart(resp.viaje,2,'DonutFrecViaAf');
            llenarTablas(resp.viajetab,14);
            llenarchart(resp.otro,2,'FactExtDonut');
            llenarTablas(resp.otrotab,15);
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
          },'json').fail(function(err){
            console.log(err);
          });
        });
        //intermedios final

        //finales
        $('#'+i+'final').on('click', function(e){
          e.preventDefault();
          id=dato['id'];
          placa=dato['placa'];
          limpiar();
          //llenar form
          let dataIncidente='Fallas electricas,Fallas en el motor,Problemas en la caja,'
          +'Problemas en la caja,Problemas en los globos,Problemas en el compresor de aire,'
          +'Problemas en los ejes,Problemas con la manguera de aire,Problemas con el radiador,'
          +'Problemas en los muelles,Problemas en el alternador,Fallas en las crucetas,Problemas en los frenos,'
          +'Problemas en la bomba,Problemas en la corona,Problemas en el turbo,Problemas en los rodamientos,'
          +'Problemas con la correa,Problemas en el tanque de combustible,Problemas en el chasis,Problemas en los inyectores,'
          +'Problemas de direccion';
          $(addcheck(dataIncidente)).appendTo('#addIncidente');

          let dataIncidente2='Accidente con fatalidad,Accidente sin fatalidad';
          $(addcheck(dataIncidente2)).appendTo('#addAccidente');

          $('#estadisticas3').show();
          $.post('/camion/finalTotal',{id:id},function(resp,status){
            console.log(resp);
            llenarchart(resp.incidente,2,'incidenteChartDonut');
            llenarTablas(resp.inctab,16);
            llenarchart(resp.fatal,2,'FatalChartDonut');
            llenarTablas(resp.fattab,17);
            llenarchart(resp.medico,2,'DonutMedico');
            llenarTablas(resp.medtab,18);
            llenarchart(resp.ruta,3,'DonutRuta');
            llenarTablas(resp.acc,19);
            llenarchart(resp.km,4,"AccKmChart");
            addCss('incidenteChartDonut');
            addCss('FatalChartDonut');
            addCss('DonutMedico');
            addCss('DonutRuta');
            addCss('AccKmChart');
            //"AccKmChart"
          },'json').fail(function(err){
            console.log(err);
          });

          $.post('/camion/generalFinal',{id:id},function(resp,status){
            console.log(resp);
            llenarchart(resp.data,1,'indicadorGeneralFinal');
            addCss('indicadorGeneralFinal');
            //"AccKmChart"
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
          $('#control').show();
          $.post('/camion/autoMes',{id:id},function(resp,status){
            console.log(resp);
            if(resp.control){
              $('#controlForm1').hide();
            }else{
              $('#controlForm2').hide();
            }
            llenarTablas(resp.data,5);
          },'json').fail(function(err){
            console.log(err);
          });
        });
        //controlar estado del camion finç
      }
  });
});
