function llenarTablas(data,p){
  let conT=1;
  let construir='<table id="example">'
                +'<thead>'
                +'<tr>'
                +'<th>Nro</th>';
  if(p==1){
        construir+='<th>Placa</th>'
                  +'<th>Lugar</th>'
                  +'<th>Velocidad</th>'
                  +'<th>Fecha</th>'
                  +'<th>Hora</th>'
                  +'</tr>'
                  +'</thead>'
                  +'<tbody id="contenidoExc">';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+placa+'</td>'
        +'<td>'+dat['lugar']+'</td>'
        +'<td>'+dat['velocidad']+'</td>'
        +'<td>'+dat['fecha']+'</td>'
        +'<td>'+dat['hora']+'</td>'
        +'</tr>';
      //añadiendo puntos de exceso
      $("#map").addMarker({
        //coords: [parseFloat(dat['lat']),parseFloat(dat['lon'])], // GPS coords
        coords: [parseFloat(dat['lat']),parseFloat(dat['lon'])],
          //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
        title:dat['fecha'],
        icon:'/fonts/icons/alert.png',
        text:'<b>EVENTO</b> exceso de velocidad por el camion '+id+'a una altitud de '
      });
      conT++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Placa</th>'
              +'<th>Lugar</th>'
              +'<th>Velocidad</th>'
              +'<th>Fecha</th>'
              +'<th>Hora</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#contenidoExceso');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==2){
        construir+='<th>Placa</th>'
                  +'<th>Lugar</th>'
                  +'<th>Fecha</th>'
                  +'<th>Hora</th>'
                  +'</tr>'
                  +'</thead>'
                  +'<tbody id="contenidoExc">';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+placa+'</td>'
        +'<td>'+dat['lugar']+'</td>'
        +'<td>'+dat['fecha']+'</td>'
        +'<td>'+dat['hora']+'</td>'
        +'</tr>';
      //añadiendo puntos de exceso
      $("#map").addMarker({
        //coords: [parseFloat(dat['lat']),parseFloat(dat['lon'])], // GPS coords
        coords: [parseFloat(dat['lat']),parseFloat(dat['lon'])],
          //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
        title:dat['fecha'],
        icon:'/fonts/icons/alert.png',
        text:'<b>EVENTO</b> exceso de velocidad por el camion '+id+'a una altitud de '
      });
      conT++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Placa</th>'
              +'<th>Lugar</th>'
              +'<th>Fecha</th>'
              +'<th>Hora</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#contenidoHorario');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==3){
    construir+='<th>Lugar</th>'
              +'<th>Observaciones</th>'
              +'<th>Fecha</th>'
              +'<th>Checks</th>'
              +'<th>Aplica</th>'
              +'<th>Acciones</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody id="contenidoExc">';
    data.forEach(function(dat){
      construir+='<tr>'
      +'<td>'+conT+'</td>'
      +'<td>'+dat['lugar']+'</td>'
      +'<td>'+dat['observacion']+'</td>'
      +'<td>'+dat['fecha']+'</td>'
      +'<td>'+dat['check'].length+'</td>'
      +'<td>'+dat['aplica']+'</td>'
      +'<td><div class="tools">'
      +'<button class="fa fa-edit" id="edit" value="funciona otro"></button>'
      +'<button class="fa fa-trash-o"></button>'
      +'</div>'
      +'</td>'
      +'</tr>';
    conT++;
    });//aqui hay cambios
    construir+='</tbody>'
        +'<tfoot>'
        +'<tr>'
        +'<th>Nro</th>'
        +'<th>Lugar</th>'
        +'<th>Observaciones</th>'
        +'<th>Fecha</th>'
        +'<th>Checks</th>'
        +'<th>Aplica</th>'
        +'<th>Acciones</th>'
        +'</tr>'
        +'</tfoot>'
        +'</table>';
    $(construir).appendTo('#bodyExt');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==4){
    construir+='<th>Descripcion</th>'
              +'<th>Infracciones</th>'
              +'<th>Fecha</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody id="contenidoExc">';
    data.forEach(function(dat){
    construir+='<tr>'
    +'<td>'+conT+'</td>'
    +'<td>'+dat['desc']+'</td>'
    //+'<td>'+dat['falta']+'</td>'
    +'<td>Un texto es</td>'
    +'<td>'+dat['fecha']+'</td>'
    +'</tr>';
    conT++;
    });//aqui hay cambios
    construir+='</tbody>'
        +'<tfoot>'
        +'<tr>'
        +'<th>Nro</th>'
        +'<th>Descripcion</th>'
        +'<th>Infracciones</th>'
        +'<th>Fecha</th>'
        +'</tr>'
        +'</tfoot>'
        +'</table>';
    $(construir).appendTo('#tablaEstadistica3');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==5){
        construir+='<th>Fecha inicio</th>'
                  +'<th>Fecha fin</th>'
                  +'<th>Excesos</th>'
                  +'<th>Horario inapropiado</th>'
                  +'<th>Tiempo de expocision</th>'
                  +'<th>Ruta</th>'
                  +'<th>Kilometros</th>'
                  +'<th>Descripcion</th>'
                  +'</tr>'
                  +'</thead>'
                  +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat['inicio']+'</td>'
        +'<td>'+dat['fin']+'</td>'
        +'<td>'+dat['exceso'].length+'</td>'
        +'<td>'+dat['horario'].length+'</td>'
        +'<td>'+dat['expocision']+'</td>'
        +'<td>'+dat['ruta']+'</td>'
        +'<td>'+dat['km']+'</td>'
        +'<td>'+dat['desc']+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Excesos</th>'
              +'<th>Horario inapropiado</th>'
              +'<th>Tiempo de expocision</th>'
              +'<th>Ruta</th>'
              +'<th>Kilometros</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#controlBodyTable');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==6){
    construir+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Km recorrido</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      let fech=dat.fecha.split(' / ');
      construir+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+fech[0]+'</td>'
        +'<td>'+fech[1]+'</td>'
        +'<td>'+dat['total']+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Km recorrido</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#tablaKmViaje');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable(dataTableLenguaje);
  }else if(p==7){
    let construir3='<table id="example3">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir3+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Horas de exposicion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      let fech=dat.fecha.split(' / ');
      construir3+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+fech[0]+'</td>'
        +'<td>'+fech[1]+'</td>'
        +'<td>'+dat['total']+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir3+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Horas de exposicion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir3).appendTo('#tablaExposicion');
    $('#example3').addClass('table table-bordered table-hover');
    $('#example3').DataTable(dataTableLenguaje);
  }else if(p==8){
    let construir2='<table id="example2">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir2+='<th>Ruta</th>'
              +'<th>Cantidad de viajes</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir2+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat['ruta']+'</td>'
        +'<td>'+dat['cant']+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir2+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Ruta</th>'
              +'<th>Cantidad de viajes</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir2).appendTo('#tablaRutaViaje');
    $('#example2').addClass('table table-bordered table-hover');
    $('#example2').DataTable(dataTableLenguaje);
  }else if(p==9){
    let construir1='<table id="example1">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir1+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Cantidad de excesos</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      let cort=dat.fecha.split(' / ');
      construir1+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+cort[0]+'</td>'
        +'<td>'+cort[1]+'</td>'
        +'<td>'+dat.total+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir1+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Cantidad de excesos</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir1).appendTo('#tablaExViaje');
    $('#example1').addClass('table table-bordered table-hover');
    $('#example1').DataTable(dataTableLenguaje);
  }else if(p==10){
    let construir2='<table id="example2">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir2+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Cantidad de infracciones en el horario</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      let cort=dat.fecha.split(' / ');
      construir2+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+cort[0]+'</td>'
        +'<td>'+cort[1]+'</td>'
        +'<td>'+dat.total+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir2+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Cantidad de infracciones en el horario</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir2).appendTo('#tablaHoViaje');
    $('#example2').addClass('table table-bordered table-hover');
    $('#example2').DataTable(dataTableLenguaje);
  }else if(p==11){
    let construir3='<table id="example3">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir3+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir3+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir3+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir3).appendTo('#tablaDesvCond');
    $('#example3').addClass('table table-bordered table-hover');
    $('#example3').DataTable(dataTableLenguaje);
  }else if(p==12){
    let construir4='<table id="example4">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir4+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir4+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir4+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir4).appendTo('#tablaDesvCam');
    $('#example4').addClass('table table-bordered table-hover');
    $('#example4').DataTable(dataTableLenguaje);
  }else if(p==13){
    let construir5='<table id="example5">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir5+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir5+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir5+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir5).appendTo('#tablaProbVia');
    $('#example5').addClass('table table-bordered table-hover');
    $('#example5').DataTable(dataTableLenguaje);
  }else if(p==14){
    let construir6='<table id="example6">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir6+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir6+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir6+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir6).appendTo('#tablaAfecVia');
    $('#example6').addClass('table table-bordered table-hover');
    $('#example6').DataTable(dataTableLenguaje);
  }else if(p==15){
    let construir7='<table id="example7">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir7+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir7+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir7+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir7).appendTo('#tablaFactExt');
    $('#example7').addClass('table table-bordered table-hover');
    $('#example7').DataTable(dataTableLenguaje);
  }else if(p==16){
    let construir1='<table id="example1">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir1+='<th>Fecha</th>'
              +'<th>Faltas</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir1+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.falta+''+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir1+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir1).appendTo('#tablaPorcInc');
    $('#example1').addClass('table table-bordered table-hover');
    $('#example1').DataTable(dataTableLenguaje);
  }else if(p==17){
    let construir2='<table id="example2">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir2+='<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir2+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.accidente+''+'</td>'
        +'<td>'+dat.ruta+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir2+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir2).appendTo('#tablaPorAcc');
    $('#example2').addClass('table table-bordered table-hover');
    $('#example2').DataTable(dataTableLenguaje);
  }else if(p==18){
    let construir3='<table id="example3">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir3+='<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir3+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.accidente+''+'</td>'
        +'<td>'+dat.ruta+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir3+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir3).appendTo('#tablaAccMed');
    $('#example3').addClass('table table-bordered table-hover');
    $('#example3').DataTable(dataTableLenguaje);
  }else if(p==19){
    let construir4='<table id="example4">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir4+='<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir4+='<tr>'
        +'<td>'+conT+'</td>'
        +'<td>'+dat.fecha+'</td>'
        +'<td>'+dat.accidente+''+'</td>'
        +'<td>'+dat.ruta+'</td>'
        +'<td>'+dat.desc+'</td>'
        +'</tr>';
      conT++;
    });//aqui hay cambios
    construir4+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Tipo de accidente</th>'
              +'<th>Ruta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir4).appendTo('#tablaPorRut');
    $('#example4').addClass('table table-bordered table-hover');
    $('#example4').DataTable(dataTableLenguaje);
  }
}
