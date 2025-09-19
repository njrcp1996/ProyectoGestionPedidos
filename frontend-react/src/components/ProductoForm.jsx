import React, { useState, useEffect } from "react";

function ProductoForm() {
    const [vista, setVista] = useState(""); // crear, listar, editar, eliminar
    const [formData, setFormData] = useState({
        Nombre: "",
        Stock: "",
        Precio: ""
    });
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // 🔥 Guarda tal cual el usuario lo escribe (ej: "2.300.000")
        });
    };

    // Crear producto
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            alert("✅ Producto creado con ID: " + data.id);
            setFormData({ Nombre: "", Stock: "", Precio: "" });
        } catch (error) {
            console.error("Error creando producto:", error);
        }
    };

    // Listar productos
    const fetchProductos = async () => {
        try {
            const res = await fetch("http://localhost:3000/productos/consultarProductos");
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al listar productos:", error);
        }
    };

    // Editar producto
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/productos/actualizarProducto", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: productoSeleccionado.id_prod }),
            });
            const data = await res.json();
            alert("✅ Producto actualizado: " + JSON.stringify(data));
            setProductoSeleccionado(null);
            setFormData({ Nombre: "", Stock: "", Precio: "" });
            fetchProductos();
        } catch (error) {
            console.error("Error actualizando producto:", error);
        }
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
        try {
            const res = await fetch(`http://localhost:3000/productos/byid?id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            alert(data.message);
            fetchProductos();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    // Renderizado
    return (
        <div>
            <h2>Gestión de Productos</h2>
            <button onClick={() => setVista("crear")}>Crear Producto</button>
            <button
                onClick={() => {
                    fetchProductos();
                    setVista("listar");
                }}
            >
                Listar Productos
            </button>
            <button
                onClick={() => {
                    fetchProductos();
                    setVista("editar");
                }}
            >
                Editar Producto
            </button>
            <button
                onClick={() => {
                    fetchProductos();
                    setVista("eliminar");
                }}
            >
                Eliminar Producto
            </button>

            {/* Crear */}
            {vista === "crear" && (
                <form onSubmit={handleCreate}>
                    <h3>Crear Producto</h3>
                    <input
                        type="text"
                        name="Nombre"
                        placeholder="Nombre"
                        value={formData.Nombre}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="Stock"
                        placeholder="Stock"
                        value={formData.Stock}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="Precio"
                        placeholder="Ej: 2.300.000"
                        value={formData.Precio}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Crear</button>
                </form>
            )}

            {/* Listar en tabla */}
            {vista === "listar" && (
                <div>
                    <h3>Lista de Productos</h3>
                    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => (
                                <tr key={p.id_prod}>
                                    <td>{p.id_prod}</td>
                                    <td>{p.Nombre}</td>
                                    <td>{p.Stock}</td>
                                    <td>{p.Precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Editar */}
            {vista === "editar" && (
                <div>
                    <h3>Editar Producto</h3>
                    {!productoSeleccionado ? (
                        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p) => (
                                    <tr key={p.id_prod}>
                                        <td>{p.id_prod}</td>
                                        <td>{p.Nombre}</td>
                                        <td>{p.Stock}</td>
                                        <td>{p.Precio}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setProductoSeleccionado(p);
                                                    setFormData({
                                                        Nombre: p.Nombre,
                                                        Stock: p.Stock,
                                                        Precio: p.Precio,
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
                            <input
                                type="text"
                                name="Nombre"
                                value={formData.Nombre}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                name="Stock"
                                value={formData.Stock}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                name="Precio"
                                value={formData.Precio}
                                onChange={handleChange}
                            />
                            <br />
                            <button type="submit">Actualizar</button>
                        </form>
                    )}
                </div>
            )}

            {/* Eliminar */}
            {vista === "eliminar" && (
                <div>
                    <h3>Eliminar Producto</h3>
                    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => (
                                <tr key={p.id_prod}>
                                    <td>{p.id_prod}</td>
                                    <td>{p.Nombre}</td>
                                    <td>{p.Stock}</td>
                                    <td>{p.Precio}</td>
                                    <td>
                                        <button onClick={() => handleDelete(p.id_prod)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProductoForm;