import pool from '../ConexionBD.js'

// Función para insertar un producto
export async function crearProducto(Nombre,Stock, Precio) {
    try {
        const [result] = await pool.query(
            "INSERT INTO productos (Nombre, Stock, Precio) VALUES (?, ?, ?)",
            [Nombre, Stock, Precio]
        );
        console.log(JSON.stringify(result))
        return result.insertId;
    } catch (error) {
        console.error("Error al crear producto:", JSON.stringify(error));
        throw error;
    }
}

// Función para obtener todos los productos
export async function obtenerProducto() {
    try {
        const rows = await pool.query("SELECT * FROM productos");
        return rows;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}



// Función para actualizar un producto
export async function actualizarProducto(producto) {
    try {
        const { Nombre, Stock, Precio, id } = producto;
        console.log(id);
        const [result] = await pool.query(
            "UPDATE productos SET Nombre = ?, Stock = ?, Precio = ? WHERE id_prod = ?",
            [Nombre, Stock, Precio, id]
        );

        return result.affectedRows;

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}

// Función para eliminar un producto
export async function eliminarProducto(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM productos WHERE  id_prod= ?", [
            id,
        ]
        );
        return result.affectedRows;

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}


function test() {
    const d = obtenerClientes();
    console.log(JSON.stringify(db))
    console.log(JSON.stringify(d))
}
