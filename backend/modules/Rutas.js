import pool from '../ConexionBD.js'

// Función para insertar una ruta
export async function crearRuta(Destino ,Distancia, Origen, Tiempo_Estado) {
    try {
        const [result] = await pool.query(
            "INSERT INTO rutas (Destino, Distancia, Origen, Tiempo_Estado) VALUES (?, ?, ?, ?)",
            [Destino ,Distancia, Origen, Tiempo_Estado]
        );
        console.log(JSON.stringify(result))
        return result.insertId;
    } catch (error) {
        console.error("Error al crear la ruta:", JSON.stringify(error));
        throw error;
    }
}

// Función para obtener todos las rutas
export async function obtenerRuta() {
    try {
        const rows = await pool.query("SELECT * FROM rutas");
        return rows;
    } catch (error) {
        console.error("Error al obtener las rutas:", error);
        throw error;
    }
}

// Función para actualizar una ruta
export async function actualizarRuta(ruta) {
    try {
        const { Destino ,Distancia, Origen, Tiempo_Estado, id } = ruta;
        console.log(id);
        const [result] = await pool.query(
            "UPDATE rutas SET Destino = ?, Distancia = ?, Origen = ?, Tiempo_Estado = ? WHERE id_Rutas = ?",
            [Destino ,Distancia, Origen, Tiempo_Estado, id]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al actualizar la ruta:", error);
        throw error;
    }
}

// Función para eliminar una ruta
export async function eliminarRuta(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM rutas WHERE  id_Rutas= ?", [
            id,
        ]
        );
        return result.affectedRows;

    } catch (error) {
        console.error("Error al eliminar la ruta:", error);
        throw error;
    }
}


function test() {
    const d = obtenerClientes();
    console.log(JSON.stringify(db))
    console.log(JSON.stringify(d))
}
