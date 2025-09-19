import pool from '../ConexionBD.js'

// Función para insertar un Pedido
export async function crearPedido(fechaCreacion, estado, id_cliente) {
    try {
        if (!id_cliente) {
            return res.status(400).json({ message: "Debe indicar el id_cliente" });
        }
        const [result] = await pool.query(
            "INSERT INTO pedidos (fecha_creacion, estado, id_cliente) VALUES (?, ?, ?)",
            [fechaCreacion, estado, id_cliente]
        );
        console.log(JSON.stringify(result))
        return result.insertId;
    } catch (error) {
        console.error("Error al crear cliente:", JSON.stringify(error));
        throw error;
    }
}

// Función para obtener todos los pedidos
export async function obtenerPedidos() {
    try {
        const rows = await pool.query("SELECT * FROM pedidos");
        return rows;
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw error;
    }
}



// Función para actualizar un pedido
export async function actualizarPedido(pedido) {
    try {
        const { fecha_creacion, estado, id_cliente,id } = pedido;
        console.log(id);
        const [result] = await pool.query(
            "UPDATE pedidos SET Fecha_creacion= ?, Estado = ?, id_Cliente = ? WHERE id_pedido = ?",
            [fecha_creacion, estado, id_cliente, id]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        throw error;
    }
}
export async function eliminarPedido(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM pedidos WHERE id_pedido= ?", [
            id,
        ]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        throw error;
    }
}


function test() {
    const d = obtenerClientes();
    console.log(JSON.stringify(db))
    console.log(JSON.stringify(d))
}
