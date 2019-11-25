const res=(resp)=>{
  let lat='';
  let lon='';
  let arr1=[];
  let arr2=[];
  let sum=0;
  try {
    resp.forEach((dat)=>{
      if((dat['Latitud']+'')!=lat&&(dat['Longitud']+'')!=lon){
        let sep=dat['Fecha'].split(' ');
        let hour=sep[1].split(':');
        if(dat['Velocidad']>70){
          arr1.push({
            lat:dat['Latitud'],
            lon:dat['Longitud'],
            lugar:dat['Referencia'],
            velocidad:dat['Velocidad'],
            fecha:sep[0],
            hora:sep[1]
          });
        }
        if(parseInt(hour[0])>=0&&parseInt(hour[0])<7){
          arr2.push({
            lat:dat['Latitud'],
            lon:dat['Longitud'],
            lugar:dat['Referencia'],
            fecha:sep[0],
            hora:sep[1]
          });
        }
        sum+=2;
      }
      lat=dat['Latitud']+'';
      lon=dat['Longitud']+'';
    });
  } catch (e) {}
  return {
    exceso:arr1,
    hora:arr2,
    expo:sum
  };
}

module.exports=res;
