function addcheck(str){
  let vec=str.split(',');
  let arm='';
  for (let m = 0; m < vec.length; m++) {
    let val=vec[m];
    arm+='<div class="checkbox">'
        +'<label>'
        +'<input type="checkbox" value="'+val+'">'
        +val
        +'</label>'
        +'</div>';

  }
  return arm;
}

$('#plusFormCond').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#textFormCond').val())).appendTo('#addFormCond');
  $('#textFormCond').val('');
});

$('#plusFormCam').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#textFormCam').val())).appendTo('#addFormCam');
  $('#textFormCam').val('');
});

$('#plusProbVia').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#textProbVia').val())).appendTo('#addProbVia');
  $('#textProbVia').val('');
});

$('#plusProbViaAf').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#textProbViaAf').val())).appendTo('#addProbViaAf');
  $('#textProbViaAf').val('');
});

$('#plusFormFactExt').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#textFormFactExt').val())).appendTo('#addFormFactExt');
  $('#textFormFactExt').val('');
});

$('#plusIncidenteButton').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#plusIncidente').val())).appendTo('#addIncidente');
  $('#plusIncidente').val('');
});

$('#plusAccidenteButton').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#plusAccidente').val())).appendTo('#addAccidente');
  $('#plusAccidente').val('');
});

$('#plusMedicaButton').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#plusMedica').val())).appendTo('#addMedica');
  $('#plusMedica').val('');
});
