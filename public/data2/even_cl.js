//button control
$('#control').on('click',function(e){
  e.preventDefault();
  var url='/veracruz2';
  $(location).attr('href',url);
});


//
$('#Exp').on('click',function(e){
  e.preventDefault();
  clean();
  $('#expocision').show();
  /*let postdata={
    id:dato['id'],
    i:exinplusign
  };*/
  $.post('/general/genExpocision',null,function(resp,status){
    console.log(resp);
    llenarTab(resp.tabla,1,'kmTabla');
    let arr=[];
    let conten=1;
    for (let i = 0,j=0; i < resp.km.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'kmChart'+conten);
        addCss('kmChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.km[i]);
    }
    if(arr.length>0){
      chart(arr,1,'kmChart'+conten);
      addCss('kmChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.hora.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'horChart'+conten);
        addCss('horChart'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.hora[i]);
    }
    if(arr.length>0){
      chart(arr,1,'horChart'+conten);
      addCss('horChart'+conten);
      conten=1;
      arr=[];
    }
    for (let i = 0,j=0; i < resp.cant.length; i++,j=(j<9?j+1:0)) {
      if(j==9){
        chart(arr,1,'viajeChart'+conten);
        addCss('viajeChar'+conten);
        conten++;
        arr=[];
      }
      arr.push(resp.cant[i]);
    }
    if(arr.length>0){
      chart(arr,1,'viajeChart'+conten);
      addCss('viajeChart'+conten);
      conten=1;
      arr=[];
    }
    chart(resp.frec,2,'rutaChart');
    addCss('rutaChart');
  },'json').fail(function(err){
    console.log(err);
  });
});
