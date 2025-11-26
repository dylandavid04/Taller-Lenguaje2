const db = require("../db");

// Registrar Estudiante
module.exports.ingresarestudiante = async (obj) => {
    const [result] = await db.query(
        "INSERT INTO dbprueba.tblestudiante VALUES (NULL,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)",
        [
            obj.tipodocumento,
            obj.documento,
            obj.nombreuno,
            obj.nombredos,
            obj.apellidouno,
            obj.apellidodos,
            obj.sexo,
            obj.rh,
            obj.direccion,
            obj.telefono,
        ]
    );
    return result.insertId; // o result, si lo necesitas completo
};

// Listar todos los estudiantes
module.exports.listarestudiantesregistrados = async () => {
    const [rows] = await db.query("SELECT * FROM dbprueba.tblestudiante;");
    return rows;
};

// Buscar estudiante por documento
module.exports.listarestudiantepordocumento = async (documento) => {
    const [rows] = await db.query(
        "SELECT * FROM dbprueba.tblestudiante WHERE documento = ?",
        [documento]
    );
    return rows[0]; // undefined si no existe (perfecto para tu controlador)
};

// Eliminar estudiante por documento
module.exports.eliminarestudiantepordocumento = async (documento) => {
    const [result] = await db.query(
        "DELETE FROM dbprueba.tblestudiante WHERE documento = ?",
        [documento]
    );
    return result.affectedRows; // 1 si borró, 0 si no existía
};

module.exports.modificarestudiante = async (documento, obj) => {
    const [result] = await db.query(
        `UPDATE dbprueba.tblestudiante
            SET tipodocumento=?, nombreuno=?, nombredos=?, apellidouno=?, apellidodos=?,
            sexo=?, rh=?, direccion=?, telefono=?
            WHERE documento=?`,
        [
            obj.tipodocumento,
            obj.nombreuno,
            obj.nombredos,
            obj.apellidouno,
            obj.apellidodos,
            obj.sexo,
            obj.rh,
            obj.direccion,
            obj.telefono,
            documento,
        ]
    );
    return result.affectedRows; // 1 si editó, 0 si no
};

//Buscar estudiantes por nombre y apellidos
module.exports.buscarestudiantepornombre = async (termino) => {
    const [registro] = await db.query(`
        SELECT * FROM dbprueba.tblestudiante 
        WHERE CONCAT(nombreuno, ' ', COALESCE(nombredos, ''), ' ', apellidouno, ' ', COALESCE(apellidodos, '')) 
        LIKE ? 
        OR nombreuno LIKE ? 
        OR apellidouno LIKE ? 
        OR apellidodos LIKE ?
    `, [`%${termino}%`, `%${termino}%`, `%${termino}%`, `%${termino}%`])
    return registro;
}

//Filtrar estudiantes por sexo
module.exports.filtrarestudianteporsexo = async (sexo) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE sexo = ?", [sexo])
    return registro;
}

//Buscar estudiantes con filtro combinado (nombre + sexo)
module.exports.buscarestudiantepornombreysexo = async (termino, sexo) => {
    const [registro] = await db.query(`
        SELECT * FROM dbprueba.tblestudiante 
        WHERE sexo = ? 
        AND (CONCAT(nombreuno, ' ', COALESCE(nombredos, ''), ' ', apellidouno, ' ', COALESCE(apellidodos, '')) 
        LIKE ? 
        OR nombreuno LIKE ? 
        OR apellidouno LIKE ? 
        OR apellidodos LIKE ?)
    `, [sexo, `%${termino}%`, `%${termino}%`, `%${termino}%`, `%${termino}%`])
    return registro;
}

//Buscar estudiantes por documento
module.exports.buscarestudiantepordocumento = async (documento) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE documento LIKE ?", [`%${documento}%`])
    return registro;
}

//Buscar estudiantes por dirección
module.exports.buscarestudiantepordireccion = async (direccion) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE direccion LIKE ?", [`%${direccion}%`])
    return registro;
}

//Buscar estudiantes por teléfono
module.exports.buscarestudianteportelefono = async (telefono) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE telefono LIKE ?", [`%${telefono}%`])
    return registro;
}

//Filtrar estudiantes por tipo de documento
module.exports.filtrarestudianteportipodocumento = async (tipodocumento) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE tipodocumento = ?", [tipodocumento])
    return registro;
}

//Filtrar estudiantes por tipo de sangre (RH)
module.exports.filtrarestudianteportiposangre = async (rh) => {
    const [registro] = await db.query("SELECT * FROM dbprueba.tblestudiante WHERE rh = ?", [rh])
    return registro;
}
