import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TarjetaProductos.css";  // Ruta correcta al archivo de estilos

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();

  const handleVerDetalles = () => {
    navigate(`/producto/${producto.id}`); // 🔗 Redirige a la página de detalles del producto
  };

  return (
    <div className="tarjeta-producto">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover" />
      <h3 className="nombre-producto">{producto.nombre}</h3> {/* Aplica la clase nombre-producto */}
      <p className="descripcion">{producto.descripcion}</p> {/* Aplica la clase descripcion */}
      <p className="precio">${producto.precio}</p>

      {/* Contenedor para los botones */}
      <div className="botones"> 
        <button className="boton-agregar">
          Agregar al carrito
        </button>
        <button 
          onClick={handleVerDetalles}
          className="boton-detalles">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
