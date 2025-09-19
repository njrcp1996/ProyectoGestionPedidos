import { Router } from "express";
import { crearEnvio, ListarEnvios } from '../modules/Envios.js'

const router = Router();

// Crear envío
router.post("/", async (req, res) => {
  try {
    const { fecha_entrega_estimada, id_ruta, id_transport, id_pedido } = req.body;
    console.log(req.body);
    const result = await crearEnvio(fecha_entrega_estimada, id_ruta, id_transport, id_pedido);
    
    res.json({ id: result, fecha_entrega_estimada, id_ruta, id_transport, id_pedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos los envíos con estado sincronizado
router.get("/consultarEnvios", async (req, res) => {
 try {
     const rows = await ListarEnvios();
     res.json(rows);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
});

export default router;