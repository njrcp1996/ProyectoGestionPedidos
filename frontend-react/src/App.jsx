import React, { useState } from "react";
import ClienteForm from "./components/ClienteForm";
import PedidoForm from "./components/PedidoForm";
import EnviosForm from "./components/EnviosForm";
import ProductoForm from "./components/ProductoForm";
import TransportistaForm from "./components/TransportistaForm";
import RutasForm from "./components/RutasForm";
import DetallePedidoForm from "./components/DetallePedidoForm";

function App() {
  const [opcion, setOpcion] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>BIENVENIDOS AL SISTEMA DE GESTION DE PEDIDOS Y TRASTREO DE ENVIOS</h1>

      {/* Menú de opciones */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setOpcion("clientes")}>Gestionar Clientes</button>
        <button onClick={() => setOpcion("pedidos")}>Gestionar Pedidos</button>
        <button onClick={() => setOpcion("productos")}>Gestionar Productos</button>
        <button onClick={() => setOpcion("transportistas")}>Gestionar Transportistas</button>
        <button onClick={() => setOpcion("rutas")}>Gestionar Rutas</button>
        <button onClick={() => setOpcion("detalle_Pedido")}>Gestionar Detalle del pedido</button>
        <button onClick={() => setOpcion("envios")}>Gestionar Envios</button>
        <button onClick={() => setOpcion(null)}>Volver al menú</button>
      </div>

      {/* Renderizado condicional */}
      {opcion === "clientes" && (
        <div>
          <ClienteForm />
        </div>
      )}

      {opcion === "pedidos" && (
        <div>
          <PedidoForm />
        </div>
      )}

      {opcion === "productos" && (
        <div>
          <ProductoForm />
        </div>
      )}

      {opcion === "transportistas" && (
        <div>
          <TransportistaForm />
        </div>
      )}

      {opcion === "rutas" && (
        <div>
          <RutasForm />
        </div>
      )}

      {opcion === "detalle_Pedido" && (
        <div>
          <DetallePedidoForm />
        </div>
      )}

      {opcion === "envios" && (
        <div>
          <EnviosForm />
        </div>
      )}

      {!opcion && <p>Selecciona una opción del menú.</p>}
    </div>
  );
}


export default App;