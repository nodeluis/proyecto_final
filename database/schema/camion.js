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
    indicador:{
      intermedio:{
        desvioConductor:{
          total:Number,
          tipo:[{
            fecha:String,
            puntoControl:Number,
            usoProteccionPersonal:Number,
            noInspeccion:Number,
            noReport:Number,
            incumplimientoHorario:Number,
            cinturon:Number,
            salud:Number,
            sinDescansar:Number,
            documentacion:Number,
            alterado:Number,
            conPasajero:Number,
            sinConocimientoRuta:Number,
            nuevo:Number,
            reporteFalso:Number,
            descripcion:String
          }]
        },
        desvioCamion:{
          total:Number,
          tipo:[{
            fecha:String,
            convoy:Number,
            gpsInactivo:Number,
            estacionamientoInseguro:Number,
            desvioRuta:Number,
            roboHurto:Number,
            luces:Number,
            descripcion:String
          }]
        },
        via:{
          total:Number,
          tipo:[{
            fecha:String,
            bache:Number,
            trafico:Number,
            inestable:Number,
            descripcion:String
          }]
        },
        viajeAfectado:{
          total:Number,
          tipo:[{
            fecha:String,
            zonaInestable:Number,
            cierreRuta:Number,
            bloqueo:Number,
            descripcion:String
          }]
        },
        otro:{
          total:Number,
          tipo:[{
            fecha:String,
            clima:Number,
            otro:Number,
            descripcion:String
          }]
        },
      },
      final:{
        incidente:{
          total:Number,
          tipo:[{
            fecha:String,
            electrica:Number,
            motor:Number,
            caja:Number,
            globo:Number,
            compresorAire:Number,
            eje:Number,
            magueraAire:Number,
            radiador:Number,
            muelle:Number,
            alternador:Number,
            cruceta:Number,
            freno:Number,
            bomba:Number,
            corona:Number,
            turbo:Number,
            rodamiento:Number,
            correa:Number,
            tanqueCombustible:Number,
            inyector:Number,
            chasis:Number,
            direccion:Number,
            descripcion:String
          }]
        },
        accidente:{
          total:Number,
          tipo:[{
            fecha:String,
            con:Number,
            sin:Number,
            descripcion:String
          }]
        },
        accidenteM:{
          total:Number,
          tipo:[{
            fecha:String,
            baja:Number,
            descripcion:String
          }]
        },
      }
    },
};

const camionModel=mongoose.model('camion',camion);

module.exports=camionModel;
