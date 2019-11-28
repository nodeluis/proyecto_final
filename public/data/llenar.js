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
    $('#example').DataTable();
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
    $('#example').DataTable();
  }else if(p==3){

    construir+='<th>Lugar</th>'
              +'<th>Observaciones</th>'
              +'<th>Fecha</th>'
              +'<th>Checks</th>'
              +'<th>Aplica</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody id="contenidoExc">';
    data.forEach(function(dat){
    construir+='<tr>'
    +'<td>'+conT+'</td>'
    +'<td>'+dat['lugar']+'</td>'
    +'<td>'+dat['observacion']+'</td>'
    +'<td>'+dat['fecha']+'</td>'
    +'<td>'+dat['check']+'</td>'
    +'<td>'+dat['aplica']+'</td>'
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
        +'</tr>'
        +'</tfoot>'
        +'</table>';
    $(construir).appendTo('#bodyExt');
    $('#example').addClass('table table-bordered table-hover');
    $('#example').DataTable();
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
    $('#example').DataTable();
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
    $('#example').DataTable();
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
    $('#example').DataTable();
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
    $('#example3').DataTable();
  }
  else if(p==8){
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
    $('#example2').DataTable();
  }
}
