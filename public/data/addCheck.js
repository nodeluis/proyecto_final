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
$('#plusIncidenteButton').on('click',function(e){
  e.preventDefault();
  $(addcheck($('#plusIncidente').val())).appendTo('#addIncidente');
  $('#plusIncidente').val('');
});
