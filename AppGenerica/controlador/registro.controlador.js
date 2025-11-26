const express = require('express'),
    router = express.Router()
const service = require('../servicios/registro.servicios')
router.post('/', async (req, res) => {
    await service.ingresarestudiante(req.body)
    res.status(201).send('Registro Exitoso!.')
})
router.get('/', async (req, res) => {
    const inscritos = await service.listarestudiantesregistrados()
    res.send(inscritos)
})
router.get('/:documento', async (req, res) => {
    const buscarinscrito = await service.listarestudiantepordocumento(req.params.documento)
    if (buscarinscrito == undefined)
        res.status(404).json('No existe este documento : ' + req.params.documento)
    else
        res.send(buscarinscrito)
})

router.put('/:documento', async (req, res) => {
    try {
        const result = await service.modificarestudiante(req.params.documento, req.body);
        if (result === 0)
            return res.status(404).send("No encontrado");

        res.send("Actualizado");
    } catch (e) {
        res.status(500).send("Error");
    }
});

router.delete('/:documento', async (req, res) => {
    try {
        const result = await service.eliminarestudiantepordocumento(req.params.documento);
        if (result === 0)
            return res.status(404).send("No encontrado");

        res.send("Eliminado");
    } catch (e) {
        res.status(500).send("Error");
    }
});

//Buscar estudiantes por nombre/apellidos
router.get('/buscar/nombre/:termino', async (req, res) => {
    try {
        const estudiantes = await service.buscarestudiantepornombre(req.params.termino)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al buscar estudiantes por nombre:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Filtrar estudiantes por sexo
router.get('/filtro/sexo/:sexo', async (req, res) => {
    try {
        const estudiantes = await service.filtrarestudianteporsexo(req.params.sexo)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al filtrar estudiantes por sexo:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Buscar estudiantes con filtro combinado (nombre + sexo)
router.get('/buscar/:termino/:sexo', async (req, res) => {
    try {
        const estudiantes = await service.buscarestudiantepornombreysexo(req.params.termino, req.params.sexo)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al buscar estudiantes con filtro combinado:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Buscar estudiantes por documento
router.get('/buscar/documento/:documento', async (req, res) => {
    try {
        const estudiantes = await service.buscarestudiantepordocumento(req.params.documento)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al buscar estudiantes por documento:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Buscar estudiantes por dirección
router.get('/buscar/direccion/:direccion', async (req, res) => {
    try {
        const estudiantes = await service.buscarestudiantepordireccion(req.params.direccion)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al buscar estudiantes por dirección:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Buscar estudiantes por teléfono
router.get('/buscar/telefono/:telefono', async (req, res) => {
    try {
        const estudiantes = await service.buscarestudianteportelefono(req.params.telefono)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al buscar estudiantes por teléfono:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Filtrar estudiantes por tipo de documento
router.get('/filtro/tipodocumento/:tipodocumento', async (req, res) => {
    try {
        const estudiantes = await service.filtrarestudianteportipodocumento(req.params.tipodocumento)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al filtrar estudiantes por tipo de documento:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

//Filtrar estudiantes por tipo de sangre
router.get('/filtro/rh/:rh', async (req, res) => {
    try {
        const estudiantes = await service.filtrarestudianteportiposangre(req.params.rh)
        res.send(estudiantes)
    } catch (error) {
        console.error('Error al filtrar estudiantes por tipo de sangre:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

module.exports = router;