import { Router } from "express";
import { actualizarPedido, crearPedido,obtenerPedidos, eliminarPedido } from '../modules/Pedidos.js'

const router = Router();

// Crear Pedido
router.post("/", async (req, res) => {
  try {
    const { fecha_creacion, estado, id_cliente } = req.body;
    const result = await crearPedido(fecha_creacion, estado, id_cliente);
    console.log(result)
    res.json({ id: result, fecha_creacion, estado, id_cliente});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar Pedidos
router.get("/consultarPedidos", async (req, res) => {
  try {
    const [rows] = await obtenerPedidos();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar pedido
router.put("/actualizarPedido", async (req, res) => {
  try {

    const { fecha_creacion, estado, id_cliente, id } = req.body;
    const result = await actualizarPedido(req.body);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ id: id, fecha_creacion, estado, id_cliente });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de un pedido
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    // 1️⃣ Actualizar el estado en la tabla pedidos
    await pool.query("UPDATE pedidos SET estado = ? WHERE id_pedido = ?", [estado, id]);

    // 2️⃣ Sincronizar fechas en envíos
    await actualizarFechasEnvio(id, estado);

    res.json({ message: "✅ Pedido actualizado correctamente", id, estado });
  } catch (error) {
    console.error("❌ Error al actualizar pedido:", error);
    res.status(500).json({ error: "Error al actualizar pedido" });
  }
});


// Eliminar pedido
router.delete("/byid", async (req, res) => {
  try {
    console.log('pasa')
    const { id } = req.query;
    console.log(JSON.stringify(id));
    const affectedRows = await eliminarPedido(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;