import React, { useState, useEffect } from "react";

const PedidoForm = () => {
  const [formData, setFormData] = useState({
    fecha_creacion: "",
    estado: "",
    id_cliente: ""
  });

  const [pedidos, setPedidos] = useState([]);
  const [vista, setVista] = useState(""); // "crear" | "listar" | "editar" | "eliminar"
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  // 🔹 Cargar pedidos
  const cargarPedidos = async () => {
    try {
      const res = await fetch("http://localhost:3000/pedidos/consultarPedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Crear pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        alert(`✅ Pedido creado con ID: ${data.id}`);
        setFormData({ fecha_creacion: "", estado: "", id_cliente: "" });
        cargarPedidos();
      } else {
        alert("❌ Error al crear pedido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🔹 Actualizar pedido
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/pedidos/actualizarPedido", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: pedidoSeleccionado.id_pedido })
      });
      if (res.ok) {
        alert("✅ Pedido actualizado correctamente");
        setPedidoSeleccionado(null);
        setFormData({ fecha_creacion: "", estado: "", id_cliente: "" });
        cargarPedidos();
      } else {
        alert("❌ Error al actualizar pedido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🔹 Eliminar pedido
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este pedido?")) return;
    try {
      const res = await fetch(`http://localhost:3000/pedidos/byid?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("🗑️ Pedido eliminado");
        cargarPedidos();
      } else {
        alert("❌ Error al eliminar pedido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Pedidos</h2>
      <div>
        <button onClick={() => setVista("crear")}>Crear</button>
        <button onClick={() => { setVista("listar"); cargarPedidos(); }}>Listar</button>
        <button onClick={() => { setVista("editar"); cargarPedidos(); }}>Editar</button>
        <button onClick={() => { setVista("eliminar"); cargarPedidos(); }}>Eliminar</button>
      </div>

      {/* Crear */}
      {vista === "crear" && (
        <form onSubmit={handleSubmit}>
          <input type="date" name="fecha_creacion" value={formData.fecha_creacion} onChange={handleChange} required />
          <br />
          <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
          <br />
          <input type="number" name="id_cliente" placeholder="ID Cliente" value={formData.id_cliente} onChange={handleChange} required />
          <br />
          <button type="submit">Guardar Pedido</button>
        </form>
      )}

      {/* Listar */}
      {vista === "listar" && (
        <ul>
          {pedidos.map((p) => (
            <li key={p.id_pedido}>
              #{p.id_pedido} - {p.Estado} - Cliente: {p.id_Cliente}
            </li>
          ))}
        </ul>
      )}

      {/* Editar */}
      {vista === "editar" && (
        <div>
          {!pedidoSeleccionado ? (
            <ul>
              {pedidos.map((p) => (
                <li key={p.id_pedido}>
                  #{p.id_pedido} - {p.Estado} - Cliente: {p.id_Cliente}
                  <button onClick={() => {
                    setPedidoSeleccionado(p);
                    setFormData({
                      fecha_creacion: p.Fecha_creacion,
                      estado: p.Estado,
                      id_cliente: p.id_Cliente
                    });
                  }}>Editar</button>
                </li>
              ))}
            </ul>
          ) : (
            <form onSubmit={handleUpdate}>
              <input type="date" name="fecha_creacion" value={formData.fecha_creacion} onChange={handleChange} />
              <br />
              <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
              <br />
              <input type="number" name="id_cliente" value={formData.id_cliente} onChange={handleChange} />
              <br />
              <button type="submit">Actualizar</button>
            </form>
          )}
        </div>
      )}

      {/* Eliminar */}
      {vista === "eliminar" && (
        <ul>
          {pedidos.map((p) => (
            <li key={p.id_pedido}>
              #{p.id_pedido} - {p.Estado} - Cliente: {p.id_Cliente}
              <button onClick={() => handleDelete(p.id_pedido)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PedidoForm;