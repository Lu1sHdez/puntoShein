import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/TarjetaProductos.css';
import '../../css/Botones.css';
import { motion } from 'framer-motion';
import CargandoModal from '../../Animations/CargandoModal';

const ProductoCard = ({ producto, onEliminar, onVerDetalles }) => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("Cargando...");
  const navigate = useNavigate();

  const irAEditar = () => {
    setMensaje("Cargando editor...");
    setCargando(true);
    setTimeout(() => {
      navigate(`/admin/productos/editar/${producto.id}`);
    }, 1000);
  };

  const eliminarProducto = async () => {
    setMensaje("Eliminando producto...");
    setCargando(true);
    try {
      await onEliminar(producto.id);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <CargandoModal visible={cargando} mensaje={mensaje} />

      <div className="tarjeta-producto">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="contenido">
          <div className="nombre-producto">{producto.nombre}</div>
          <div className="descripcion">{producto.descripcion}</div>
          <div className="precio">${producto.precio}</div>

          <div className="botones">
          <motion.button
            className="boton-detalles"
            onClick={() => onVerDetalles(producto)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Ver Detalles
          </motion.button>


            <motion.button
              className="boton-editar"
              onClick={irAEditar}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Editar
            </motion.button>

            <motion.button
              className="boton-eliminar"
              onClick={eliminarProducto}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Eliminar
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
  onVerDetalles: PropTypes.func.isRequired, 

};

export default ProductoCard;