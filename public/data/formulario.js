////botones extintores
$('#formExtint').submit(function(e) {
  e.preventDefault();
  var erm=[];
  for (var ii = 1; ii <=4; ii++) {
    erm.push($('#ext'+ii).val());
  }
  for (var ii = 1; ii <= 12; ii++) {
    erm.push($('input:radio[name=r'+ii+']:checked','#formExtint').val());
  }
  $.post('/camion/extintor',{data:erm+'',id:id},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});

////botones extintores final

//formulario incidentes
$('#formIncidente').submit(function(e) {
  e.preventDefault();
  let inc=[];
  inc.push($('#fechaIncidente').val());
  inc.push($('#descripcionIncidente').val());
  $('input[type=checkbox]:checked',$(this)).each(function() {
      inc.push($(this).val());
  });
  $.post('/camion/incidente',{data:inc+'',id:id},function(resp,status){
    console.log(resp);

  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});
//formulario incidentes final

//formulario desvio conductor
$('#formDesvCon').submit(function(e) {
  e.preventDefault();
  console.log($('#fechaDesvCon').val());
  console.log($('#descripcionDesvCon').val());
  $('input[type=checkbox]:checked',$(this)).each(function() {
      console.log($(this).val());
  });
  $(this).trigger("reset");
});
//formulario desvio conductor Final

//formulario desvio camion
$('#formDesvCam').submit(function(e) {
  e.preventDefault();

  $('input[type=checkbox]:checked',$(this)).each(function() {
      console.log($(this).val());
  });

  $(this).trigger("reset");
});
//formulario desvio camion Final

//formulario via
$('#formProbVia').submit(function(e) {
  e.preventDefault();

  $('input[type=checkbox]:checked',$(this)).each(function() {
      console.log($(this).val());
  });

  $(this).trigger("reset");
});
//formulario via Final

//formulario afectado por via
$('#formAfecVia').submit(function(e) {
  e.preventDefault();

  $('input[type=checkbox]:checked',$(this)).each(function() {
      console.log($(this).val());
  });

  $(this).trigger("reset");
});
//formulario afectado por via Final

//formulario factores externos
$('#formFactExt').submit(function(e) {
  e.preventDefault();

  $('input[type=checkbox]:checked',$(this)).each(function() {
      console.log($(this).val());
  });

  $(this).trigger("reset");
});
//formulario factores externos Final

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
