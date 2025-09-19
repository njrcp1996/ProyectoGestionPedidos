import { Router } from "express";
import { crearRuta, obtenerRuta, actualizarRuta, eliminarRuta } from '../modules/Rutas.js'

const router = Router();

// Crear ruta
router.post("/", async (req, res) => {
  try {
    const {Destino ,Distancia, Origen, Tiempo_Estado } = req.body;
    const result = await crearRuta(Destino ,Distancia, Origen, Tiempo_Estado);
    console.log(result)
    res.json({ id: result, Destino ,Distancia, Origen, Tiempo_Estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar ruta
router.get("/consultarRuta", async (req, res) => {
  try {
    const [rows] = await obtenerRuta();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Actualizar ruta
router.put("/actualizarRuta", async (req, res) => {
  try {

    const {Destino ,Distancia, Origen, Tiempo_Estado, id } = req.body;
    const result = await actualizarRuta(req.body);
    console.log(result);
    if (result === 0) {
      return res.status(404).json({ message: "Ruta no encontrado" });
    }
    res.json({ id: id, Destino ,Distancia, Origen, Tiempo_Estado});
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// Eliminar ruta
router.delete("/byid", async (req, res) => {
  try {
    console.log('pasa')
    const { id } = req.query;
    console.log(JSON.stringify(id));
    const affectedRows = await eliminarRuta(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Ruta no encontrado" });
    }
    res.json({ message: "Ruta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;