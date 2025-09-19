import pool from '../ConexionBD.js'

// Función para insertar un detalle 
export async function crearDetallePedido(Cantidad, PrecioTotal, id_pedido, id_prod) {
    try {
        if (!Cantidad || !PrecioTotal || !id_pedido || !id_prod) {
            throw new Error("Faltan datos obligatorios");
        }

        const [result] = await pool.query(
            `INSERT INTO detalle_pedido (Cantidad, PrecioTotal, id_pedido, id_prod)
             VALUES (?, ?, ?, ?)`,
            [Cantidad, PrecioTotal, id_pedido, id_prod]
        );

        console.log("✅ Insertado detalle:", JSON.stringify(result));
        return result.insertId;
    } catch (error) {
        console.error("❌ Error al crear el detalle del pedido:", error.message);
        throw error; // <-- lanzamos el error al router
    }
}

// Función para lista los detalles de los pedidos
export async function ListarDetallePedido() {
    try {
        const rows = await pool.query(`
       SELECT d.id_Detalle, d.Cantidad, d.PrecioTotal,
             d.id_pedido, d.id_prod, prod.Nombre AS producto
      FROM detalle_pedido d
      INNER JOIN pedidos p ON d.id_pedido = p.id_pedido
      INNER JOIN productos prod ON d.id_prod = prod.id_prod
    `);

        return rows;
    } catch (error) {
        console.error("❌ Error al traer :", error);
        res.status(500).json({ error: "Error al listar el detalle de los pedidos" });
    }
}