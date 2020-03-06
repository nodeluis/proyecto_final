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
  addCharge('formDesvCharge');
  $.post('/camion/desvio',{data:inc+'',id:id,desc:$('#descripcionDesvCon',).val(),fecha:$('#fechaDesvCon').val()},function(resp,status){
    console.log(resp);
    updateIntermedio();
    removeCharge('formDesvCharge');
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
  addCharge('formDesvCamCharge');
  $.post('/camion/desvioCamion',{data:inc+'',id:id,desc:$('#descripcionDesvCam',).val(),fecha:$('#fechaDesvCam').val()},function(resp,status){
    console.log(resp);
    updateIntermedio();
    removeCharge('formDesvCamCharge');
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
  addCharge('formViaCharge');
  $.post('/camion/via',{data:inc+'',id:id,desc:$('#descripcionProbVia',).val(),fecha:$('#fechaProbVia').val()},function(resp,status){
    console.log(resp);
    updateIntermedio();
    addCharge('formRemoveCharge');
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
  addCharge('formAfecViaCharge');
  $.post('/camion/viajeAfectado',{data:inc+'',id:id,desc:$('#descripcionAfecVia',).val(),fecha:$('#fechaAfecVia').val()},function(resp,status){
    console.log(resp);
    updateIntermedio();
    removeCharge('formAfecViaCharge');
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
  addCharge('formFactExtCharge');
  $.post('/camion/otro',{data:inc+'',id:id,desc:$('#descripcionFactExt',).val(),fecha:$('#fechaFactExt').val()},function(resp,status){
    console.log(resp);
    updateIntermedio();
    removeCharge('formFactExtCharge');
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
  addCharge('formIncCharge');
  $.post('/camion/incidente',{data:inc+'',id:id,fecha:$('#fechaIncidente').val(),desc:$('#descripcionIncidente').val()},function(resp,status){
    console.log(resp);
    updateFinal();
    removeCharge('formIncCharge');
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
  addCharge('formFatCharge');
  let select_button_text = $('#selectAccidente option:selected').toArray().map(item => item.value);
  $.post('/camion/fatal',{accidente:inc+'',id:id,desc:$('#descripcionAccidente',).val(),fecha:$('#fechaAccidente').val(),ruta:select_button_text+''},function(resp,status){
    console.log(resp);
    updateFinal();
    removeCharge('formFatCharge');
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
  addCharge('formMedCharge');
  $.post('/camion/medico',{accidente:inc+'',id:id,desc:$('#descripcionMedica',).val(),fecha:$('#fechaMedica').val(),ruta:select_button_text+''},function(resp,status){
    console.log(resp);
    updateFinal();
    removeCharge('formMedCharge');
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
$('#controlForm1').on('click',function(e) {
  e.preventDefault();
  //#expocisionSelect

  let select_button_text = $('#controlSelect option:selected').toArray().map(item => item.value);
  let textarea=$('#controlDescripcion').val();
  console.log(textarea);
  let fech=(new Date()).toLocaleString();
  fech=manip(fech);
  let envi={ruta:select_button_text+'',
            id:id,
            desc:textarea,
            fecha:fech
          };
  console.log(envi);
  addCharge('mapCharge');
  $.post('/camion/on',envi,function(resp,status){
    console.log(resp);
    updateMapa();
  },'json').fail(function(err){
    console.log(err);
  });
  $('#controlF1').hide();
  $('#controlF2').show();
  $(this).trigger("reset");
});

$('#controlForm2').on('click',function(e) {
  e.preventDefault();
  //#expocisionSelect

  let fech=(new Date()).toLocaleString();
  fech=manip(fech);
  let envi={id:id,
            fecha:fech
          }
  console.log(envi);
  addCharge('mapCharge');
  addCharge('tabControlCharge');
  $.post('/camion/on',envi,function(resp,status){
    console.log(resp);
    updateMapa();
    $('#controlF2').hide();
    $('#controlF1').show();
    $.post('/camion/autoMes',{id:id},function(resp,status){
      console.log(resp);
      $('#controlBodyTable').empty();
      llenarTablas(resp.data,5);
      removeCharge('tabControlCharge');
    },'json').fail(function(err){
      console.log(err);
    });
  },'json').fail(function(err){
    console.log(err);
  });
  $(this).trigger("reset");
});

function manip(f){
    let fech=f.split(' ');
    let fe=fech[0].split('/');
    let hour=fech[1].split(':');
    return fe[2]+'-'+(parseInt(fe[1])<10?'0'+fe[1]:fe[1])+'-'+(parseInt(fe[0])<10?'0'+fe[0]:fe[0])+' '+hour[0]+':'+hour[1];
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

//form boton menu lista
$('#search-btn').on('click',function(e) {
  e.preventDefault();
  //#expocisionSelect
  let str=$('#textoBusqueda').val().toLowerCase();
  let c='';
  menuArr.forEach((item, i) => {
    item.state=false;
    $('#'+item.id).show();
  });
  if(str!=''){
    for (let i = 0; i < str.length; i++) {
      c+=str.charAt(i);
      menuArr.forEach((item, i) => {
        let index=item.placa.indexOf(c);
        if(index!=-1){
          item.state=true;
        }
      });
    }
    menuArr.forEach((item, i) => {
      if(item.state){
        $('#'+item.id).show();
      }else{
        $('#'+item.id).hide();
      }
    });
  }

  $(this).trigger("reset");
});
