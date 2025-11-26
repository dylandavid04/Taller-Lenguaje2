const express = require('express'),
app = express(),
bodyparser = require('body-parser');
//require('express-async-errors')
const db = require('./db'),
rutas = require('./controlador/registro.controlador')
var cors = require('cors');
app.use(cors());
app.use(bodyparser.json())
app.use('/prueba', rutas)
// MIDDLEWARE DE ERRORES (solo uno)

app.use((err, req, res, next) => {
    //console.log(res)
    console.error("🔥 Error:", err);
    res.status(err.status || 200).send('Inscripcion exitosa!')
})
db.query("SELECT 1")
    .then(() => {
        console.log('Conexion a la Base de Datos.')
        app.listen(5000,
            () => console.log('Servidor iniciado 5000'))
    })
    .catch(err => console.log('No se conecto la base de datos. \n' + err))