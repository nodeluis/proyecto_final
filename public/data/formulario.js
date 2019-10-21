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
