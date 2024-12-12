import React from "react";
import "./pills.css"; // Asegúrate de que la ruta sea correcta

const Pills = ({ type }) => {
  // Transformar el tipo a formato de clase CSS (en minúsculas y sin espacios)
  const pillClass = `pill pill-${type.toLowerCase()}`;

  return <span className={pillClass}>{type}</span>;
};

export default Pills;
