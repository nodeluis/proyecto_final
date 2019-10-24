function llenar_modal(t){
  let llen='';
  let button='';
  $('#modalBody').empty();
  $('#buttonModal').empty();
  if(t){
    llen='<p>Este camion ya se encuentra siendo monitoreado por el administrador, si desea parar el monitoreo solo presione Monitoreo(off)</p>';
    button='<button type="button" class="btn btn-outline" data-dismiss="modal" id="buttonDesmonitorear">Monitoreo(off)</button>';
  }else{
    llen+='<div class="box box-info">'
        +'<div class="box-header with-border">'
        +'<h3 class="box-title">Formulario de control del camion</h3>'
        +'</div>'
        +'<div class="box-body">'
        +'<div class="form-group">'
        +'<label>Opciones</label>'
        +'<select class="form-control" id="modalSelect">'
        +'<option>option 1</option>'
        +'<option>option 2</option>'
        +'<option>option 3</option>'
        +'<option>option 4</option>'
        +'<option>option 5</option>'
        +'</select>'
        +'</div>'
        +'<div class="form-group">'
        +'<label>Descripcion</label>'
        +'<textarea class="form-control" rows="3" placeholder="Descripcion ..." id="modalDescrpcion"></textarea>'
        +'</div>'
        +'</div>'
        +'</div>';
    button='<button type="button" class="btn btn-outline" data-dismiss="modal" id="buttonMonitorear">Monitoreo(on)</button>';
  }
  $(llen).appendTo('#modalBody');
  $(button).appendTo('#buttonModal');

  //modal envio
  $('#buttonMonitorear').on('click',function(e){
    e.preventDefault();
    console.log('llega');
    let select=$('#modalSelect').val();
    let descrip=$('#modalDescrpcion').val();
    console.log(select);
    console.log(descrip);
  });
  //modal envio final

  //modal monitoreo off
  $('#buttonDesmonitorear').on('click',function(e){
    e.preventDefault();
    console.log('llega');
    /*$.post('/general/controlar',{id:dato['id']}, function(response,status) {
      console.log(response);
    },'json').fail(function(err){
      console.log(err);
    });*/
  });
  //modal monitoreo off final
  
}
