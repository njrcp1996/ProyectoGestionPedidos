import { Router } from "express";
import { crearCliente, obtenerClientes, obtenerClientePorId, actualizarCliente, eliminarCliente } from '../modules/Clientes.js'

const router = Router();



// Crear cliente
router.post("/", async (req, res) => {
  try {
    const { nombre, direccion, telefono, email } = req.body;
    const result = await crearCliente(nombre, direccion, telefono, email);
    console.log(result)
    res.json({ id: result, nombre, direccion, telefono, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar clientes
router.get("/", async (req, res) => {
  try {
    const [rows] = await obtenerClientes();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener cliente por id
router.get("/byid", async (req, res) => {
  console.log('pasa')
  try {
    const { id } = req.query; // aquí capturas el id del query param
    console.log(JSON.stringify(id));
    const [rows] = await obtenerClientePorId(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar cliente
router.put("/actualizarcliente", async (req, res) => {
  try {

    const { nombre, direccion, telefono, email, id } = req.body;
    const result = await actualizarCliente(req.body);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ id: id, nombre, direccion, telefono, email });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete("/byid", async (req, res) => {
  try {
    console.log('pasa')
    const { id } = req.query;
    console.log(JSON.stringify(id));
    const affectedRows = await eliminarCliente(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;