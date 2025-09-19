import pool from '../ConexionBD.js'

// Función para insertar un envio
export async function crearEnvio(fecha_entrega_estimada, id_ruta, id_transport, id_pedido) {
  try {
    const [result] = await pool.query(
      "INSERT INTO envios (Fecha_Entrega_Estimada, Fecha_Entrega_Real, Fecha_Salida, id_Ruta, id_Transport, id_pedido) VALUES (?,?,?,?,?,?)",
      [fecha_entrega_estimada, null, null, id_ruta, id_transport, id_pedido]
    );
    console.log(JSON.stringify(result))
    return result.insertId;
  } catch (error) {
    console.error("Error al crear el envio:", JSON.stringify(error));
    throw error;
  }
}

// Función para obtener todos los envíos con el estado sincronizado desde pedidos
export async function ListarEnvios() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        e.id_Envios,
        p.estado AS Estado_Envio, -- siempre el estado del pedido
        GROUP_CONCAT(pr.nombre SEPARATOR ', ') AS productos, -- agrupa productos
        SUM(pr.precio * dp.Cantidad) AS precio_total, -- suma total del pedido
        e.Fecha_Entrega_Estimada,
        CASE 
          WHEN p.estado = 'entregado' THEN IFNULL(e.Fecha_Entrega_Real, CURDATE())
          ELSE e.Fecha_Entrega_Real
        END AS Fecha_Entrega_Real,
        CASE 
          WHEN p.estado = 'en ruta' THEN IFNULL(e.Fecha_Salida, CURDATE())
          ELSE e.Fecha_Salida
        END AS Fecha_Salida,
        e.id_pedido,
        e.id_Ruta,
        e.id_Transport
      FROM envios e
      INNER JOIN pedidos p ON e.id_pedido = p.id_pedido
      INNER JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
      INNER JOIN productos pr ON dp.id_prod = pr.id_prod
      GROUP BY e.id_Envios, p.estado, e.Fecha_Entrega_Estimada, e.Fecha_Entrega_Real, e.Fecha_Salida, e.id_pedido, e.id_Ruta, e.id_Transport
    `);

    return rows;
  } catch (error) {
    console.error("❌ Error al listar envíos:", error);
    throw error;
  }
}