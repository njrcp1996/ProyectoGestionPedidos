import { Router } from "express";
import { crearProducto, obtenerProducto, actualizarProducto, eliminarProducto } from '../modules/Productos.js'

const router = Router();



// Crear producto
router.post("/", async (req, res) => {
  try {
    const {Nombre, Stock, Precio } = req.body;
    const result = await crearProducto(Nombre, Stock, Precio);
    console.log(result)
    res.json({ id: result, Nombre,Stock, Precio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar produto
router.get("/consultarProductos", async (req, res) => {
  try {
    const [rows] = await obtenerProducto();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Actualizar producto
router.put("/actualizarProducto", async (req, res) => {
  try {

    const {Nombre, Stock, Precio, id } = req.body;
    const result = await actualizarProducto(req.body);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ id: id, Nombre,Stock, Precio});
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
router.delete("/byid", async (req, res) => {
  try {
    console.log('pasa')
    const { id } = req.query;
    console.log(JSON.stringify(id));
    const affectedRows = await eliminarProducto(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;