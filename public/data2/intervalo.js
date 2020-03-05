//20min 7200000 3seg 60000 ->240000
addCharge('monitoreoCharge');
var fechEnv2;
var fechEnv=(new Date()).toLocaleString();
fechEnv=manip(fechEnv);
setInterval(function(){
  fechEnv2=(new Date()).toLocaleString();
  fechEnv2=manip(fechEnv2);
  let dataFalt={
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
      //monitoreoTab
      $('#monitoreoTab').empty();
      llenarTab(resp.data,5,'monitoreoTab');
    }
  });
  removeCharge('monitoreoCharge');
  actualizarMapa();
  fechEnv=fechEnv2;
},7200000);


function manip(f){
    let fech=f.split(' ');
    let fe=fech[0].split('/');
    let hour=fech[1].split(':');
    return fe[2]+'-'+(parseInt(fe[1])<10?'0'+fe[1]:fe[1])+'-'+(parseInt(fe[0])<10?'0'+fe[0]:fe[0])+' '+hour[0]+':'+hour[1];
}
