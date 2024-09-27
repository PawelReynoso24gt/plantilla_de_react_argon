import React, { useEffect, useState } from "react";
import axios from "axios";
import Author from "./author"; // Asegúrate de que el componente Author esté correctamente definido

const AuthorsTable = () => {
  const [profesores, setProfesores] = useState([]);
  const [editingId, setEditingId] = useState(null); // Estado para manejar la edición
  const [formData, setFormData] = useState({
    nombre: "",
    dpi: "",
    domicilio: "",
    telefono: "",
    correo: "",
    carnet: "",
    estado: 1,
  });

  // Obtener todos los profesores
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profesores/getProfesores`) // Usa variable de entorno para la URL de la API
      .then((response) => {
        setProfesores(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error obteniendo los profesores", error);
      });
  }, []);

  // Crear o actualizar un profesor
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Actualizar un profesor existente
      axios
        .put(`${process.env.REACT_APP_API_URL}/profesores/update/${editingId}`, formData)
        .then((response) => {
          setProfesores(
            profesores.map((profesor) =>
              profesor.id === editingId ? response.data : profesor
            )
          );
          setEditingId(null); // Salir del modo de edición
          setFormData({
            nombre: "",
            dpi: "",
            domicilio: "",
            telefono: "",
            correo: "",
            carnet: "",
            estado: 1,
          });
        })
        .catch((error) => {
          console.error("Hubo un error actualizando el profesor", error);
        });
    } else {
      // Crear un nuevo profesor
      axios
        .post(`${process.env.REACT_APP_API_URL}/profesores/create`, formData)
        .then((response) => {
          setProfesores([...profesores, response.data]);
          setFormData({
            nombre: "",
            dpi: "",
            domicilio: "",
            telefono: "",
            correo: "",
            carnet: "",
            estado: 1,
          });
        })
        .catch((error) => {
          console.error("Hubo un error creando el profesor", error);
        });
    }
  };

  // Eliminar un profesor
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/profesores/delete/${id}`)
      .then(() => {
        setProfesores(profesores.filter((profesor) => profesor.id !== id));
      })
      .catch((error) => {
        console.error("Hubo un error eliminando el profesor", error);
      });
  };

  // Cargar la información del profesor al formulario para editar
  const handleEdit = (profesor) => {
    setEditingId(profesor.id);
    setFormData({
      nombre: profesor.nombre,
      dpi: profesor.dpi,
      domicilio: profesor.domicilio,
      telefono: profesor.telefono,
      correo: profesor.correo,
      carnet: profesor.carnet,
      estado: profesor.estado,
    });
  };

  return (
    <div>
      <h2>Listado de Profesores</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DPI</th>
            <th>Domicilio</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Carnet</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map((profesor) => (
            <tr key={profesor.id}>
              <td>{profesor.nombre}</td>
              <td>{profesor.dpi}</td>
              <td>{profesor.domicilio}</td>
              <td>{profesor.telefono}</td>
              <td>{profesor.correo}</td>
              <td>{profesor.carnet}</td>
              <td>{profesor.estado ? "Activo" : "Inactivo"}</td>
              <td>
                <button onClick={() => handleEdit(profesor)}>Editar</button>
                <button onClick={() => handleDelete(profesor.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingId ? "Actualizar Profesor" : "Crear Profesor"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="DPI"
          value={formData.dpi}
          onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Domicilio"
          value={formData.domicilio}
          onChange={(e) => setFormData({ ...formData, domicilio: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Carnet"
          value={formData.carnet}
          onChange={(e) => setFormData({ ...formData, carnet: e.target.value })}
          required
        />
        <select
          value={formData.estado}
          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        >
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default AuthorsTable;
