import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/TarjetaProductos.css';
import '../../css/Botones.css';
import { motion } from 'framer-motion';

const ProductoCard = ({ producto, onEliminar }) => {

  // Función para manejar la eliminación del producto
  const handleEliminar = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Este producto será eliminado permanentemente.',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacion.isConfirmed) {
        await onEliminar(id); // Llamar a la función pasada como prop para eliminar
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado exitosamente.',
        });
      }
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el producto.',
      });
    }
  };

  return (
    <div className="tarjeta-producto">
      <img src={producto.imagen} alt={producto.nombre} />
      
      <div className="contenido">
        <div className="nombre-producto">{producto.nombre}</div>
        <div className="descripcion">{producto.descripcion}</div>
        <div className="precio">${producto.precio}</div>

        <div className="botones">
          <motion.button
            className="boton-detalles"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link to={`/admin/productos/detalle/${producto.id}`}>
              Ver Detalles
            </Link>
          </motion.button>
          
          {/* Botón de Editar */}
          <motion.button
            className="boton-editar"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link to={`/admin/productos/editar/${producto.id}`}>
              Editar
            </Link>
          </motion.button>

          {/* Botón de Eliminar */}
          <motion.button
            className="boton-eliminar"
            onClick={() => handleEliminar(producto.id)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Eliminar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Define los tipos de las props que se esperan
ProductoCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default ProductoCard;
