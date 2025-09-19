import pool from '../ConexionBD.js'

// Función para insertar un transportista
export async function crearTransportista(Empresa ,Nombre, Telefono) {
    try {
        const [result] = await pool.query(
            "INSERT INTO transportistas (Empresa ,Nombre, Telefono) VALUES (?, ?, ?)",
            [Empresa ,Nombre, Telefono]
        );
        console.log(JSON.stringify(result))
        return result.insertId;
    } catch (error) {
        console.error("Error al crear la ruta:", JSON.stringify(error));
        throw error;
    }
}

// Función para obtener todos los transportistas
export async function obtenerTransportista() {
    try {
        const rows = await pool.query("SELECT * FROM transportistas");
        return rows;
    } catch (error) {
        console.error("Error al obtener las rutas:", error);
        throw error;
    }
}

// Función para actualizar un transportista
export async function actualizarTransportista(ruta) {
    try {
        const { Empresa ,Nombre, Telefono, id } = ruta;
        console.log(id);
        const [result] = await pool.query(
            "UPDATE transportistas SET Empresa = ?, Nombre = ?, Telefono = ? WHERE id_Transport = ?",
            [Empresa ,Nombre, Telefono, id]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al actualizar la ruta:", error);
        throw error;
    }
}

// Función para eliminar un transportista
export async function eliminarTransportista(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM transportistas WHERE  id_Transport= ?", [
            id,
        ]
        );
        return result.affectedRows;

    } catch (error) {
        console.error("Error al eliminar el transportista:", error);
        throw error;
    }
}


function test() {
    const d = obtenerClientes();
    console.log(JSON.stringify(db))
    console.log(JSON.stringify(d))
}
