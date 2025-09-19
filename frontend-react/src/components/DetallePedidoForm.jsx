import React, { useState, useEffect } from "react";

const DetallePedidoForm = () => {
  const [detalles, setDetalles] = useState([]);
  const [formData, setFormData] = useState({
    Cantidad: "",
    id_pedido: "",
    id_prod: "",
    PrecioTotal: "",
  });

  // Obtener lista de detalles de pedido
  const fetchDetalles = async () => {
    try {
      const res = await fetch("http://localhost:3000/detallePedido/consultarDetalleEnvio");
      const data = await res.json();
      setDetalles(data);
    } catch (error) {
      console.error("Error obteniendo los detalles:", error);
    }
  };

  useEffect(() => {
    fetchDetalles();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear un detalle de pedido
  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:3000/detallePedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchDetalles(); // refrescar lista
        setFormData({ Cantidad: "", id_pedido: "", id_prod: "", PrecioTotal: "" }); // limpiar formulario
      }
    } catch (error) {
      console.error("Error creando el detalle:", error);
    }
  };

  return (
    <div>
      <h2>Gestión de Detalle de Pedido</h2>

      <div>
        <input
          type="number"
          name="Cantidad"
          placeholder="Cantidad"
          value={formData.Cantidad}
          onChange={handleChange}
        />
        <input
          type="number"
          name="id_pedido"
          placeholder="ID Pedido"
          value={formData.id_pedido}
          onChange={handleChange}
        />
        <input
          type="number"
          name="id_prod"
          placeholder="ID Producto"
          value={formData.id_prod}
          onChange={handleChange}
        />
        <input
          type="text"
          name="PrecioTotal"
          placeholder="Precio Total"
          value={formData.PrecioTotal}
          onChange={handleChange}
        />

        <button onClick={handleCreate}>Crear</button>
      </div>

      <h3>Lista de Detalles de Pedido</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cantidad</th>
            <th>ID Pedido</th>
            <th>ID Producto</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <tr key={detalle.id_Detalle}>
              <td>{detalle.id_Detalle}</td>
              <td>{detalle.Cantidad}</td>
              <td>{detalle.id_pedido}</td>
              <td>{detalle.id_prod}</td>
              <td>{detalle.PrecioTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetallePedidoForm;