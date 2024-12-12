import React from "react";

const BubbleCard = ({ imageUrl, altText }) => {
  return (
    <div
      style={{
        width: "150px", // Tamaño de la tarjeta
        height: "150px", // Tamaño de la tarjeta
        borderRadius: "50%", // Hacemos que la tarjeta sea circular
        overflow: "hidden", // Asegura que la imagen se recorte si es más grande que el contenedor
        border: "2px solid grey", // Borde gris para la card
        display: "flex", // Usamos flexbox para centrar la imagen dentro de la card
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para darle profundidad
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        style={{
          width: "100%", // La imagen ocupa todo el tamaño de la card
          height: "100%", // La imagen ocupa todo el tamaño de la card
          objectFit: "cover", // Ajusta la imagen para cubrir el área del círculo sin distorsionar
        }}
      />
    </div>
  );
};

export default BubbleCard;
