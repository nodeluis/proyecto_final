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
    $('#example'+f).DataTable();
  }
}
