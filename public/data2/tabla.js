function llenarTab(data,f,id){
  let con=1;
  if(f==1){
    let construir='<table id="example'+f+'">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Km</th>'
              +'<th>Ruta</th>'
              +'<th>Expocision</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+con+'</td>'
        +'<td>'+dat['inicio']+'</td>'
        +'<td>'+dat['fin']+'</td>'
        +'<td>'+dat['km']+'</td>'
        +'<td>'+dat['ruta']+'</td>'
        +'<td>'+dat['expocision']+'</td>'
        +'<td>'+dat['desc']+'</td>'
        +'</tr>';
      con++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Km</th>'
              +'<th>Ruta</th>'
              +'<th>Expocision</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#'+id);
    $('#example'+f).addClass('table table-bordered table-hover');
    $('#example'+f).DataTable(dataTableLenguaje);
  }else if(f==2){
    let construir='<table id="example'+f+'">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir+='<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Excesos</th>'
              +'<th>Horarios Inapropiados</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+con+'</td>'
        +'<td>'+dat['inicio']+'</td>'
        +'<td>'+dat['fin']+'</td>'
        +'<td>'+dat['exceso']+'</td>'
        +'<td>'+dat['horario']+'</td>'
        +'<td>'+dat['desc']+'</td>'
        +'</tr>';
      con++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha inicio</th>'
              +'<th>Fecha fin</th>'
              +'<th>Excesos</th>'
              +'<th>Horarios Inapropiados</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#'+id);
    $('#example'+f).addClass('table table-bordered table-hover');
    $('#example'+f).DataTable(dataTableLenguaje);
  }else if(f==3){
    let construir='<table id="example'+f+'">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir+='<th>Fecha</th>'
              +'<th>Infraccion/falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+con+'</td>'
        +'<td>'+dat['fecha']+'</td>'
        +'<td>'+dat['falta']+'</td>'
        +'<td>'+dat['desc']+'</td>'
        +'</tr>';
      con++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Infraccion/falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#'+id);
    $('#example'+f).addClass('table table-bordered table-hover');
    $('#example'+f).DataTable(dataTableLenguaje);
  }else if(f==4){
    let construir='<table id="example'+f+'">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir+='<th>Fecha</th>'
              +'<th>Infraccion/falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+con+'</td>'
        +'<td>'+dat['fecha']+'</td>'
        +'<td>'+dat['falta']+'</td>'
        +'<td>'+dat['desc']+'</td>'
        +'</tr>';
      con++;
    });//aqui hay cambios
    construir+='</tbody>'
              +'<tfoot>'
              +'<tr>'
              +'<th>Nro</th>'
              +'<th>Fecha</th>'
              +'<th>Infraccion/falta</th>'
              +'<th>Descripcion</th>'
              +'</tr>'
              +'</tfoot>'
              +'</table>';
    $(construir).appendTo('#'+id);
    $('#example'+f).addClass('table table-bordered table-hover');
    $('#example'+f).DataTable(dataTableLenguaje);
  }else if(f==5){
    let construir='<table id="example'+f+'">'
                  +'<thead>'
                  +'<tr>'
                  +'<th>Nro</th>';
    construir+='<th>Placa</th>'
              +'<th>Lugar</th>'
              +'<th>Velocidad</th>'
              +'<th>Fecha</th>'
              +'<th>Hora</th>'
              +'</tr>'
              +'</thead>'
              +'<tbody>';
    data.forEach(function(dat){
      construir+='<tr>'
        +'<td>'+con+'</td>'
        +'<td>'+dat['placa']+'</td>'
        +'<td>'+dat['lugar']+'</td>'
        +'<td>'+dat['velocidad']+'</td>'
        +'<td>'+dat['fecha']+'</td>'
        +'<td>'+dat['hora']+'</td>'
        +'</tr>';
      con++;
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
    $(construir).appendTo('#'+id);
    $('#example'+f).addClass('table table-bordered table-hover');
    $('#example'+f).DataTable(dataTableLenguaje);
  }
}
