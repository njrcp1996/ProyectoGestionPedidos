import React, { useEffect, useState } from "react";

const RutasForm = () => {
  const [formData, setFormData] = useState({
    Origen: "",
    Destino: "",
    Distancia: "",
    Tiempo_Estado: "",
  });

  const [rutas, setRutas] = useState([]);
  const [vista, setVista] = useState(""); // "crear" | "listar" | "editar" | "eliminar"
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

  // 🔹 Cargar rutas desde backend
  const cargarRutas = async () => {
    try {
      const res = await fetch("http://localhost:3000/rutas/consultarRuta");
      const data = await res.json();
      setRutas(data);
    } catch (err) {
      console.error("Error al cargar rutas:", err);
    }
  };

  useEffect(() => {
    cargarRutas();
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Crear ruta
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/rutas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("✅ Ruta creada correctamente");
        setFormData({ Origen: "", Destino: "", Distancia: "", Tiempo_Estado: "" });
        cargarRutas();
      } else {
        alert("❌ Error al crear ruta");
      }
    } catch (err) {
      console.error("Error al crear ruta:", err);
    }
  };

  // 🔹 Actualizar ruta
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/rutas/actualizarRuta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: rutaSeleccionada.id_Rutas }),
      });
      if (res.ok) {
        alert("✅ Ruta actualizada correctamente");
        setRutaSeleccionada(null);
        setFormData({ Origen: "", Destino: "", Distancia: "", Tiempo_Estado: "" });
        cargarRutas();
      } else {
        alert("❌ Error al actualizar ruta");
      }
    } catch (err) {
      console.error("Error al actualizar ruta:", err);
    }
  };

  // 🔹 Eliminar ruta
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta ruta?")) return;
    try {
      const res = await fetch(`http://localhost:3000/rutas/byid?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("✅ Ruta eliminada correctamente");
        cargarRutas();
      } else {
        alert("❌ Error al eliminar ruta");
      }
    } catch (err) {
      console.error("Error al eliminar ruta:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Gestión de Rutas</h2>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setVista("crear")}>Crear</button>
        <button onClick={() => setVista("listar")}>Listar</button>
        <button onClick={() => setVista("editar")}>Editar</button>
        <button onClick={() => setVista("eliminar")}>Eliminar</button>
      </div>

      {/* 🔹 Crear */}
      {vista === "crear" && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="Origen" placeholder="Origen" value={formData.Origen} onChange={handleChange} required />
          <input type="text" name="Destino" placeholder="Destino" value={formData.Destino} onChange={handleChange} required />
          <input type="text" name="Distancia" placeholder="Distancia" value={formData.Distancia} onChange={handleChange} required />
          <input type="text" name="Tiempo_Estado" placeholder="Tiempo Estado" value={formData.Tiempo_Estado} onChange={handleChange} required />
          <button type="submit">Guardar Ruta</button>
        </form>
      )}

      {/* 🔹 Listar */}
      {vista === "listar" && (
        <div>
          <h3>📋 Rutas Registradas</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Distancia</th>
                <th>Tiempo Estado</th>
              </tr>
            </thead>
            <tbody>
              {rutas.map((r) => (
                <tr key={r.id_Rutas}>
                  <td>{r.id_Rutas}</td>
                  <td>{r.Origen}</td>
                  <td>{r.Destino}</td>
                  <td>{r.Distancia}</td>
                  <td>{r.Tiempo_Estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Editar */}
      {vista === "editar" && (
        <div>
          {!rutaSeleccionada ? (
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Distancia</th>
                  <th>Tiempo Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rutas.map((r) => (
                  <tr key={r.id_Rutas}>
                    <td>{r.id_Rutas}</td>
                    <td>{r.Origen}</td>
                    <td>{r.Destino}</td>
                    <td>{r.Distancia}</td>
                    <td>{r.Tiempo_Estado}</td>
                    <td>
                      <button
                        onClick={() => {
                          setRutaSeleccionada(r);
                          setFormData({
                            Origen: r.Origen,
                            Destino: r.Destino,
                            Distancia: r.Distancia,
                            Tiempo_Estado: r.Tiempo_Estado,
                          });
                        }}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <form onSubmit={handleUpdate}>
              <input type="text" name="Origen" value={formData.Origen} onChange={handleChange} />
              <input type="text" name="Destino" value={formData.Destino} onChange={handleChange} />
              <input type="text" name="Distancia" value={formData.Distancia} onChange={handleChange} />
              <input type="text" name="Tiempo_Estado" value={formData.Tiempo_Estado} onChange={handleChange} />
              <button type="submit">Actualizar</button>
            </form>
          )}
        </div>
      )}

      {/* 🔹 Eliminar */}
      {vista === "eliminar" && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Distancia</th>
              <th>Tiempo Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((r) => (
              <tr key={r.id_Rutas}>
                <td>{r.id_Rutas}</td>
                <td>{r.Origen}</td>
                <td>{r.Destino}</td>
                <td>{r.Distancia}</td>
                <td>{r.Tiempo_Estado}</td>
                <td>
                  <button onClick={() => handleDelete(r.id_Rutas)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RutasForm;