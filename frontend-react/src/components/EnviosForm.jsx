import React, { useEffect, useState } from "react";

const EnvioForm = () => {
    const [formData, setFormData] = useState({
        fecha_entrega_estimada: "",
        id_ruta: "",
        id_transport: "",
        id_pedido: ""
    });


    const [envios, setEnvios] = useState([]);
    const [vista, setVista] = useState(""); // "crear" | "listar"

    // Manejo de inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Crear envío (usa tu ruta POST /envios/)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/envios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                alert(`✅ Envío creado con ID: ${data.id}`);
                setFormData({
                    fecha_entrega_estimada: "",
                    id_ruta: "",
                    id_transport: "",
                    id_pedido: ""
                });

            } else {
                alert("❌ Error al crear envío");
            }
        } catch (err) {
            console.error("Error en creación:", err);
        }
    };

    // Listar envíos (usa tu ruta GET /envios/consultarEnvios)
    const cargarEnvios = async () => {
        try {
            const res = await fetch("http://localhost:3000/envios/consultarEnvios");
            const data = await res.json();
            setEnvios(data);
        } catch (err) {
            console.error("Error al cargar envíos:", err);
        }
    };

    useEffect(() => {
        if (vista === "listar") {
            cargarEnvios();
        }
    }, [vista]);


    return (
        <div style={{ padding: "20px" }}>
            <h2>Gestión de Envíos</h2>

            {/* Botones menú */}
            <div style={{ marginBottom: "15px" }}>
                <button onClick={() => setVista("crear")}>Crear Envío</button>
                <button onClick={() => setVista("listar")}>Listar Envíos</button>
            </div>

            {/* Formulario Crear Envío */}
            {vista === "crear" && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="fecha_entrega_estimada"
                        value={formData.fecha_entrega_estimada}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        name="id_ruta"
                        placeholder="ID Ruta"
                        value={formData.id_ruta}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        name="id_transport"
                        placeholder="ID Transportista"
                        value={formData.id_transport}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        name="id_pedido"
                        placeholder="ID Pedido"
                        value={formData.id_pedido}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Guardar Envío</button>
                </form>
            )}
            {/* Lista de Envíos */}
            {vista === "listar" && (
                <div>
                    <h3>Lista de Envíos</h3>
                    <table border="1" cellPadding="5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estado</th>
                                <th>Productos</th>
                                <th>Precio Total</th>
                                <th>Fecha Salida</th>
                                <th>Fecha Estimada</th>
                                <th>Fecha Real</th>
                                <th>ID Pedido</th>
                                <th>ID Ruta</th>
                                <th>ID Transport</th>
                            </tr>
                        </thead>
                        <tbody>
                            {envios.map((e) => {
                                return (
                                    <tr key={e.id_Envios}>
                                        <td>{e.id_Envios}</td>
                                        <td>{e.Estado_Envio || "-"}</td>
                                        <td>{e.productos || "-"}</td>
                                        <td>{e.precio_total}</td>
                                        <td>{e.Fecha_Salida || "-"}</td>
                                        <td>{e.Fecha_Entrega_Estimada || "-"}</td>
                                        <td>{e.Fecha_Entrega_Real || "-"}</td>
                                        <td>{e.id_pedido}</td>
                                        <td>{e.id_Ruta}</td>
                                        <td>{e.id_Transport}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EnvioForm;