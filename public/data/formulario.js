////botones extintores
$('#formExtint').submit(function(e) {
  e.preventDefault();
  var erm=[];
  var erm2=[];
  for (var ii = 1; ii <=4; ii++) {
    erm2.push($('#ext'+ii).val());
  }
  for (var ii = 1; ii <= 12; ii++) {
    erm.push($('input:radio[name=r'+ii+']:checked','#formExtint').val());
  }
  $.post('/camion/extintor',{data:erm+'',data2:erm2+'',id:id},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
  console.log(erm);
});

////botones extintores final

//formulario desvio conductor
$('#formDesvCon').submit(function(e) {
  e.preventDefault();
  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/desvio',{data:inc+'',id:id,desc:$('#descripcionDesvCon',).val(),fecha:$('#fechaDesvCon').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});
//formulario desvio conductor Final

//formulario desvio camion
$('#formDesvCam').submit(function(e) {
  e.preventDefault();

  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/desvioCamion',{data:inc+'',id:id,desc:$('#descripcionDesvCam',).val(),fecha:$('#fechaDesvCam').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });

  $(this).trigger("reset");
});
//formulario desvio camion Final

//formulario via
$('#formProbVia').submit(function(e) {
  e.preventDefault();

  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/via',{data:inc+'',id:id,desc:$('#descripcionProbVia',).val(),fecha:$('#fechaProbVia').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });

  $(this).trigger("reset");
});
//formulario via Final

//formulario afectado por via
$('#formAfecVia').submit(function(e) {
  e.preventDefault();

  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/viajeAfectado',{data:inc+'',id:id,desc:$('#descripcionAfecVia',).val(),fecha:$('#fechaAfecVia').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });

  $(this).trigger("reset");
});
//formulario afectado por via Final

//formulario factores externos
$('#formFactExt').submit(function(e) {
  e.preventDefault();

  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/otro',{data:inc+'',id:id,desc:$('#descripcionFactExt',).val(),fecha:$('#fechaFactExt').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });

  $(this).trigger("reset");
});
//formulario factores externos Final

//formulario incidentes
$('#formIncidente').submit(function(e) {
  e.preventDefault();
  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/incidente',{data:inc+'',id:id,fecha:$('#fechaIncidente').val(),desc:$('#descripcionIncidente').val()},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});

$('#formAccidente').submit(function(e) {
  e.preventDefault();

  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  let select_button_text = $('#selectAccidente option:selected').toArray().map(item => item.value);
  $.post('/camion/fatal',{accidente:inc+'',id:id,desc:$('#descripcionAccidente',).val(),fecha:$('#fechaAccidente').val(),ruta:select_button_text+''},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });

  $(this).trigger("reset");
});


$('#formMedico').submit(function(e) {
  e.preventDefault();
  let inc=[];
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  let select_button_text = $('#selectMedica option:selected').toArray().map(item => item.value);
  $.post('/camion/medico',{accidente:inc+'',id:id,desc:$('#descripcionMedica',).val(),fecha:$('#fechaMedica').val(),ruta:select_button_text+''},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});
//formulario incidentes final

//ordenar elementos de select multiple
$(".select2").on("select2:select", function (evt) {
  var element = evt.params.data.element;
  var $element = $(element);

  if ($(this).find(":selected").length > 1) {
    var $second = $(this).find(":selected").eq(-1);
    $second.after($element);
  } else {
    $element.detach();
    $(this).prepend($element);
  }

  $(this).trigger("change");
});
//ordenar elementos de select multiple fin

//controlform
$('#controlForm1').submit(function(e) {
  e.preventDefault();
  //#expocisionSelect

  let select_button_text = $('#controlSelect option:selected').toArray().map(item => item.value);
  let textarea=$('#controlDescripcion').val();
  console.log(textarea);
  $.get( '/general/control/'+id, function(resp) {
    console.log(resp);
    let t=132;
    if(resp.control){
      t=2;
    }else{
      t=1;
    }
    let fech=(new Date()).toLocaleString();
    fech=manip(fech);
    let envi={ruta:select_button_text+'',
              id:id,
              desc:textarea,
              t:t,
              fecha:fech
            };
    console.log(envi);
    $.post('/camion/on',envi,function(resp,status){
      console.log(resp);

    },'json').fail(function(err){
      console.log(err);
    });
  });
  $(this).trigger("reset");
});

$('#controlForm2').submit(function(e) {
    e.preventDefault();
    //#expocisionSelect

    $.get( '/general/control/'+id, function(resp) {
    console.log(resp);
    let t=132;
    if(resp.control){
      t=2;
    }else{
      t=1;
    }
    let fech=(new Date()).toLocaleString();
    fech=manip(fech);
    let envi={id:id,
              fecha:fech,
              t:t
            }
    $.post('/camion/on',envi,function(resp,status){
      console.log(resp);

    },'json').fail(function(err){
      console.log(err);
    });
  });
  $(this).trigger("reset");
});

function manip(f){
    let fech=f.split(' ');
    let fe=fech[0].split('/');
    let hour=fech[1].split(':');
    return fe[2]+'-'+fe[1]+'-'+fe[0]+' '+hour[0]+':'+hour[1];
}

$('#controlSend').on('click', function(e){
  e.preventDefault();
  let rep=($('#controlReservation').val()).split(' - ');
  $.post('/camion/autoMes',{id:id,fi:rep[0],ff:rep[1]},function(resp,status){
    $('#controlBodyTable').empty();
    console.log(resp);
    llenarTablas(resp.data,5);
  },'json').fail(function(err){
    console.log(err);
  });
});
//control form Final
