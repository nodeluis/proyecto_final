const mongoose=require('../connect');

const camion={
    id:String,
    placa:String,
    exceso:[{
      lat:String,
      lon:String,
      lugar:String,
      velocidad:String,
      fecha:String,
      hora:String
    }],
    horario:[{
      lat:String,
      lon:String,
      lugar:String,
      fecha:String,
      hora:String
    }],
    extintor:[{
      lugar:String,
      fecha:String,
      observacion:String,
      aplica:Boolean,
      check:{
        botella:String,
        etiqueta:String,
        mangera:String,
        boquilla:String,
        peso:String,
        manometro:String,
        seguro:String,
        ubicacion:String,
        limpieza:String,
        area:String,
        trabajo:String,
        señalizado:String
      }
    }],
    //indicador intermedio
    desvioConductor:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    desvioCamion:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    via:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    viajeAfectado:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    otro:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    //indicador final
    incidente:[{
      fecha:String,
      falta:[],
      desc:String,
    }],
    control:[{
      fechaInicio:String,
      fechaFin:String,
      descripcion:String,
      ruta:String
    }]
};

const camionModel=mongoose.model('camion',camion);

module.exports=camionModel;
