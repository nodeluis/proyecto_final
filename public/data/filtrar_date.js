function selectRequest(p){
  var x=$('#reservation').val();
  var x2=x.split(' - ');
  let postdata={
    id:id,
    fi:x2[0],
    ff:x2[1]
  };
  if(p==1){
    $.post('/camion/fechaE', postdata, function(response,status) {
      $('#excesosDiv').show();
      $('#dateRange').show();
      console.log(response);
      try{
        llenarTablas(response,1);
      }catch(error){
        console.log(response);
      }

    },'json').fail(function(err){
      console.log(err);
    });
  }else if(p==2){
    $.post('/camion/fechaH', postdata, function(response,status) {
      $('#horarioDiv').show();
      $('#dateRange').show();
      try{
        llenarTablas(response,2);
      }catch(error){
        console.log(response);
      }

    },'json').fail(function(err){
      console.log(err);
    });
  }
}
