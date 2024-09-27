import React from "react";
import PropTypes from "prop-types";

// Componente para mostrar información del profesor
function Author({ profesor }) {
  return (
    <div>
      <div>
        <h4>{profesor.nombre}</h4>
        <p>Email: {profesor.correo}</p>
        <p>DPI: {profesor.dpi}</p>
        <p>Domicilio: {profesor.domicilio}</p>
        <p>Teléfono: {profesor.telefono}</p>
        <p>Carnet: {profesor.carnet}</p>
        <p>Estado: {profesor.estado ? "Activo" : "Inactivo"}</p>
      </div>
    </div>
  );
}

// Validación de tipos de propiedades
Author.propTypes = {
  profesor: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    dpi: PropTypes.string.isRequired,
    domicilio: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    carnet: PropTypes.number.isRequired,
    estado: PropTypes.number.isRequired,
  }).isRequired,
};

export default Author;
