import { Router } from "express";
import { crearDetallePedido, ListarDetallePedido } from '../modules/DetallePedido.js'

const router = Router();

// Crear envío
router.post("/", async (req, res) => {
  try {
    const { Cantidad, PrecioTotal, id_pedido, id_prod } = req.body;
    console.log(req.body);
    const result = await crearDetallePedido(Cantidad, PrecioTotal, id_pedido, id_prod);
    
    res.json({ id: result, Cantidad, PrecioTotal, id_pedido, id_prod });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos los envíos con estado sincronizado
router.get("/consultarDetalleEnvio", async (req, res) => {
 try {
     const [rows] = await ListarDetallePedido();
      res.json(rows);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
});

export default router;