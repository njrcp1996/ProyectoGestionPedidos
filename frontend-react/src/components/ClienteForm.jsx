import React, { useEffect, useState } from "react";

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: ""
  });

  const [clientes, setClientes] = useState([]);
  const [vista, setVista] = useState(""); // "agregar" | "listar" | "editar" | "eliminar"
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Cargar clientes al inicio
  const cargarClientes = async () => {
    try {
      const res = await fetch("http://localhost:3000/clientes");
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //Crear Cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await res.json().then(data => {
          console.log(data);
          alert(`✅ Cliente creado con ID: ${data.id}`);
          setFormData({ nombre: "", direccion: "", telefono: "", email: "" });
        });

        await cargarClientes();

      } else {
        alert("❌ Error al crear cliente");
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("❌ Error de conexión con el backend");
    }
  };

  // Eliminar cliente
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      const res = await fetch(`http://localhost:3000/clientes/byid?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Cliente eliminado correctamente");
        await cargarClientes(); // refrescar lista después de eliminar
      } else {
        alert("❌ Error al eliminar cliente");
      }
    } catch (error) {
      console.error("Error en eliminación:", error);
      alert("Error de conexión con el backend");
    }
  };

  // Editar cliente
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/clientes/actualizarcliente", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: clienteSeleccionado.id_Cliente }),
      });
      const data = await res.json();
      alert("✅ Cliente actualizado: " + JSON.stringify(data));
      setClienteSeleccionado(null);
      setFormData({ nombre: "", direccion: "", telefono: "", email: "" });
      cargarClientes();
    } catch (error) {
      console.error("Error actualizando cliente:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Menú */}
      <h2>Gestión de Clientes</h2>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setVista("agregar")}>Agregar</button>
        <button onClick={() => setVista("listar")}>Listar</button>
        <button onClick={() => setVista("editar")}>Actualizar</button>
        <button onClick={() => setVista("eliminar")}>Eliminar</button>
      </div>

      {/* Agregar */}
      {vista === "agregar" && (
        <div>
          <h3>Agregar Cliente</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            <br />
            <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
            <br />
            <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            <br />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
            <br />
            <button type="submit">Guardar Cliente</button>
          </form>
        </div>
      )}

      {/* Listar */}
      {vista === "listar" && (
        <div>
          <h3>Clientes Registrados</h3>
          <ul>
            {clientes.map((c) => (
              <li key={c.id_Cliente}>
                {c.id_Cliente}- {c.Nombre} - {c.Email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editar */}
      {vista === "editar" && (
        <div>
          <h3>Actualizar Cliente</h3>
          {!clienteSeleccionado ? (
            <ul>
              {clientes.map((c) => (
                <li key={c.id_Cliente}>
                  {c.Nombre} - {c.Email}{" "}
                  <button onClick={() => {
                    setClienteSeleccionado(c);
                    setFormData({
                      nombre: c.Nombre,
                      direccion: c.Direccion,
                      telefono: c.Telefono,
                      email: c.Email
                    });
                  }}>
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <form onSubmit={handleUpdate}>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              <br />
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
              <br />
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
              <br />
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              <br />
              <button type="submit">Actualizar</button>
            </form>
          )}
        </div>
      )}

      {/* Eliminar */}
      {vista === "eliminar" && (
        <div>
          <h3>Eliminar Cliente</h3>
          <ul>
            {clientes.map((c) => (
              <li key={c.id_Cliente}>
                {c.Nombre} - {c.Email}{" "}
                <button onClick={() => handleDelete(c.id_Cliente)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

};

export default ClienteForm;
