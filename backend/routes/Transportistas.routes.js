import { Router } from "express";
import { crearTransportista, obtenerTransportista, actualizarTransportista, eliminarTransportista } from '../modules/Transportistas.js'

const router = Router();



// Crear transportista
router.post("/", async (req, res) => {
  try {
    const {Empresa ,Nombre, Telefono} = req.body;
    const result = await crearTransportista(Empresa ,Nombre, Telefono);
    console.log(result)
    res.json({ id: result, Empresa ,Nombre, Telefono });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar transportista
router.get("/consultarTransportista", async (req, res) => {
  try {
    const [rows] = await obtenerTransportista();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Actualizar Transportista
router.put("/actualizarTransportista", async (req, res) => {
  try {

    const {Empresa ,Nombre, Telefono, id } = req.body;
    const result = await actualizarTransportista(req.body);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({ message: "Transportista no encontrado" });
    }
    res.json({ id: id, Empresa ,Nombre, Telefono});
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// Eliminar transportista
router.delete("/byid", async (req, res) => {
  try {
    console.log('pasa')
    const { id } = req.query;
    console.log(JSON.stringify(id));
    const affectedRows = await eliminarTransportista(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Transportista no encontrado" });
    }
    res.json({ message: "Transportista eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;