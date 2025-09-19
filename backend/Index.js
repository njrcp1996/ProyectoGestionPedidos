import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import clientesRoutes from "./routes/Clientes.routes.js";
import pedidosRoutes from "./routes/Pedidos.routes.js";
import productosRoutes from "./routes/Productos.routes.js";
import rutasRoutes from "./routes/Rutas.routes.js";
import transportistasRoutes from "./routes/Transportistas.routes.js";
import enviosRoutes from "./routes/Envios.routes.js";
import detallePedidoRoutes from "./routes/DetallePedidos.routes.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Usar rutas
app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/productos", productosRoutes);
app.use("/rutas", rutasRoutes);
app.use("/transportistas", transportistasRoutes);
app.use("/envios", enviosRoutes);
app.use("/detallePedido", detallePedidoRoutes);




app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});