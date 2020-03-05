//20min 7200000 3seg 60000
addCharge('monitoreoCharge');
var conSkip=0;
var fechEnv2;
var fechEnv=(new Date()).toLocaleString();
fechEnv=manip(fechEnv);
setInterval(function(){
  fechEnv2=(new Date()).toLocaleString();
  fechEnv2=manip(fechEnv2);
  let dataFalt={
    sk:conSkip,
    fecha:fechEnv,
    fecha2:fechEnv2
  };
  $.ajax({
    url: '/general/traerFalta',
    headers: {
        'token':token
    },
    method: 'POST',
    dataType: 'json',
    data:dataFalt,
    success: function(resp){
      console.log(resp);
    }
  });
  removeCharge('monitoreoCharge');
  if(conSkip<35){
    conSkip+=5;
  }else{
    conSkip=0;
  }
  fechEnv=fechEnv2;
}, 120000);


function manip(f){
    let fech=f.split(' ');
    let fe=fech[0].split('/');
    let hour=fech[1].split(':');
    return fe[2]+'-'+(parseInt(fe[1])<10?'0'+fe[1]:fe[1])+'-'+(parseInt(fe[0])<10?'0'+fe[0]:fe[0])+' '+hour[0]+':'+hour[1];
}
