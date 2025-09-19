import pool from '../ConexionBD.js'

// Función para insertar un cliente
export async function crearCliente(nombre, direccion, telefono, email) {
    try {
        const [result] = await pool.query(
            "INSERT INTO cliente (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)",
            [nombre, direccion, telefono, email]
        );
        console.log(JSON.stringify(result))
        return result.insertId;
    } catch (error) {
        console.error("Error al crear cliente:", JSON.stringify(error));
        throw error;
    }
}

// Función para obtener todos los clientes
export async function obtenerClientes() {
    try {
        const rows = await pool.query("SELECT * FROM cliente");
        return rows;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
}

// Función para obtener todos los clientes por id
export async function obtenerClientePorId(id) {
    try {
        const rows = await pool.query("SELECT * FROM cliente WHERE id_Cliente = ?", [
            id,
        ]);
        return rows;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
}


// Función para actualizar un cliente
export async function actualizarCliente(cliente) {
    try {
        const { nombre, direccion, telefono, email, id } = cliente;
        console.log(id);
        const [result] = await pool.query(
            "UPDATE cliente SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id_Cliente = ?",
            [nombre, direccion, telefono, email, id]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al actualizar clientes:", error);
        throw error;
    }
}

export async function eliminarCliente(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM cliente WHERE id_Cliente= ?", [
            id,
        ]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        throw error;
    }
}

function test() {
    const d = obtenerClientes();
    console.log(JSON.stringify(db))
    console.log(JSON.stringify(d))
}

