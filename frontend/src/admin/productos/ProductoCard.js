import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/TarjetaProductos.css';
import '../../css/Botones.css';
import { motion } from 'framer-motion';


const ProductoCard = ({ producto, onEliminar }) => {
    return (
      <div className="tarjeta-producto">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="contenido">
          <div className="nombre-producto">{producto.nombre}</div>
          <div className="descripcion">{producto.descripcion}</div>
          <div className="precio">${producto.precio}</div>
  
          <div className="botones">
            <motion.button className="boton-detalles" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to={`/admin/productos/detalle/${producto.id}`}>Ver Detalles</Link>
            </motion.button>
  
            <motion.button className="boton-editar" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to={`/admin/productos/editar/${producto.id}`}>Editar</Link>
            </motion.button>
  
            <motion.button
              className="boton-eliminar"
              onClick={() => onEliminar(producto.id)} // SIN confirmación aquí
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
