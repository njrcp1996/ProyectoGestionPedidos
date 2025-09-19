import React, { useEffect, useState } from "react";

const TransportistaForm = () => {
  const [formData, setFormData] = useState({
    Empresa: "",
    Nombre: "",
    Telefono: "",
  });

  const [transportistas, setTransportistas] = useState([]);
  const [vista, setVista] = useState(""); // "agregar" | "listar" | "editar" | "eliminar"
  const [transportistaSeleccionado, setTransportistaSeleccionado] = useState(null);

  // Cargar transportistas al inicio
  const cargarTransportistas = async () => {
    try {
      const res = await fetch("http://localhost:3000/transportistas/consultarTransportista");
      const data = await res.json();
      setTransportistas(data);
    } catch (err) {
      console.error("Error al cargar transportistas:", err);
    }
  };

  useEffect(() => {
    cargarTransportistas();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Crear Transportista
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/transportistas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ Transportista creado con ID: ${data.id}`);
        setFormData({ Empresa: "", Nombre: "", Telefono: "" });
        cargarTransportistas();
      } else {
        alert("❌ Error al crear transportista");
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
    }
  };

  // Eliminar Transportista
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este transportista?")) return;

    try {
      const res = await fetch(`http://localhost:3000/transportistas/byid?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Transportista eliminado correctamente");
        cargarTransportistas();
      } else {
        alert("❌ Error al eliminar transportista");
      }
    } catch (error) {
      console.error("Error en eliminación:", error);
    }
  };

  // Actualizar Transportista
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/transportistas/actualizarTransportista", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: transportistaSeleccionado.id_Transport }),
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ Transportista actualizado: " + JSON.stringify(data));
        setTransportistaSeleccionado(null);
        setFormData({ Empresa: "", Nombre: "", Telefono: "" });
        cargarTransportistas();
      } else {
        alert("❌ Error al actualizar transportista");
      }
    } catch (error) {
      console.error("Error actualizando transportista:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Transportistas</h2>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setVista("agregar")}>Agregar</button>
        <button onClick={() => setVista("listar")}>Listar</button>
        <button onClick={() => setVista("editar")}>Actualizar</button>
        <button onClick={() => setVista("eliminar")}>Eliminar</button>
      </div>

      {/* Agregar */}
      {vista === "agregar" && (
        <div>
          <h3>Agregar Transportista</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="Empresa" placeholder="Empresa" value={formData.Empresa} onChange={handleChange} required />
            <br />
            <input type="text" name="Nombre" placeholder="Nombre" value={formData.Nombre} onChange={handleChange} required />
            <br />
            <input type="text" name="Telefono" placeholder="Teléfono" value={formData.Telefono} onChange={handleChange} required />
            <br />
            <button type="submit">Guardar Transportista</button>
          </form>
        </div>
      )}

      {/* Listar */}
      {vista === "listar" && (
        <div>
          <h3>Transportistas Registrados</h3>
          <ul>
            {transportistas.map((t) => (
              <li key={t.id_Transport}>
                {t.id_Transport} - {t.Empresa} - {t.Nombre} - {t.Telefono}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editar */}
      {vista === "editar" && (
        <div>
          <h3>Actualizar Transportista</h3>
          {!transportistaSeleccionado ? (
            <ul>
              {transportistas.map((t) => (
                <li key={t.id_Transport}>
                  {t.Empresa} - {t.Nombre} - {t.Telefono}{" "}
                  <button
                    onClick={() => {
                      setTransportistaSeleccionado(t);
                      setFormData({
                        Empresa: t.Empresa,
                        Nombre: t.Nombre,
                        Telefono: t.Telefono,
                      });
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <form onSubmit={handleUpdate}>
              <input type="text" name="Empresa" value={formData.Empresa} onChange={handleChange} />
              <br />
              <input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} />
              <br />
              <input type="text" name="Telefono" value={formData.Telefono} onChange={handleChange} />
              <br />
              <button type="submit">Actualizar</button>
            </form>
          )}
        </div>
      )}

      {/* Eliminar */}
      {vista === "eliminar" && (
        <div>
          <h3>Eliminar Transportista</h3>
          <ul>
            {transportistas.map((t) => (
              <li key={t.id_Transport}>
                {t.Empresa} - {t.Nombre} - {t.Telefono}{" "}
                <button onClick={() => handleDelete(t.id_Transport)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransportistaForm;