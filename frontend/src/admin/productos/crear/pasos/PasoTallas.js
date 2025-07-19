import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../ApiConexion';
import CargandoModal from '../../../../Animations/CargandoModal';
import ModalGestionTallas from './ModalGestionTallas'; // ajusta la ruta si es necesario

const PasoTallas = ({ producto, setProducto, onAnterior, onSiguiente }) => {
  const [tallasDisponibles, setTallasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validando, setValidando] = useState(false);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalGestionTallas, setMostrarModalGestionTallas] = useState(false);


  useEffect(() => {
    const fetchTallas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/tallas/obtener`, { withCredentials: true });
        setTallasDisponibles(response.data);
      } catch (error) {
        console.error('Error al obtener tallas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTallas();
  }, []);

  const handleTallaChange = (e, talla) => {
    const { name, value } = e.target;
    const newTallas = producto.tallas.map((t) => {
      if (t.talla_id === talla.id) {
        return { ...t, nombre: talla.nombre, [name]: value === '' ? '' : Number(value) };
      }
      return t;
    });
    setProducto((prev) => ({ ...prev, tallas: newTallas }));
    // Limpiar error si existe
    if (errores[talla.id]) {
      setErrores(prev => ({ ...prev, [talla.id]: undefined }));
    }
  };

  const handleCheckboxChange = (e, talla) => {
    const { checked } = e.target;
    const newTallas = checked
      ? [...producto.tallas, { talla_id: talla.id,nombre: talla.nombre }] // sin stock inicial
      : producto.tallas.filter((t) => t.talla_id !== talla.id);
    setProducto((prev) => ({ ...prev, tallas: newTallas }));
  };  

  const validarTallas = () => {
    const nuevosErrores = {};
    let tieneStock = false;
    let stockValido = true;

    // Validar que al menos una talla esté seleccionada
    if (producto.tallas.length === 0) {
      nuevosErrores.general = "Debes seleccionar al menos una talla";
    }

    // Validar el stock de cada talla seleccionada
    producto.tallas.forEach(talla => {
      if (talla.stock < 0) {
        nuevosErrores[talla.talla_id] = "El stock no puede ser negativo";
        stockValido = false;
      }
      if (talla.stock > 0) {
        tieneStock = true;
      }
    });

    // Validar que al menos una talla tenga stock
    if (!tieneStock && producto.tallas.length > 0) {
      nuevosErrores.general = "Al menos una talla debe tener stock mayor a cero";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSiguiente = async () => {
    if (!validarTallas()) {
      return;
    }

    setMostrarModal(true);
    setValidando(true);

    // Simular validación en el servidor (puedes reemplazar con una llamada real)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSiguiente();
    } catch (error) {
      console.error("Error al validar:", error);
    } finally {
      setValidando(false);
      setMostrarModal(false);
    }
  };

  return (
    <div className="step-container p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Agrega las tallas y su stock</h3>

      {/* Modal de validación */}
      <CargandoModal 
        mensaje={validando ? "Validando tallas..." : "Cargando..."} 
        visible={mostrarModal} 
      />

      {loading ? (
        <p className='mb-4 p-3 bg-blue-100 text-blue-600 rounded'>Cargando tallas disponibles...</p>
      ) : (
        <>
          {/* Mensaje de error general */}
          {errores.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {errores.general}
            </div>
          )}

          {/* Listado de tallas disponibles */}
          <div className="mb-4">
            {tallasDisponibles.map((talla) => (
              <div key={talla.id} className="flex items-center space-x-4 mb-4 p-3 border rounded">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`talla-${talla.id}`}
                    onChange={(e) => handleCheckboxChange(e, talla)}
                    checked={producto.tallas.some((t) => t.talla_id === talla.id)}
                    className="h-5 w-5"
                  />
                  <label htmlFor={`talla-${talla.id}`} className="ml-2 text-lg font-medium">
                    {talla.nombre}
                  </label>
                </div>  

                {producto.tallas.some((t) => t.talla_id === talla.id) && (
                  <div className="flex-1">
                    <div className="flex items-center">
                      <label className="mr-2">Stock:</label>
                      <input
                        type="number"
                        name="stock"
                        min="0"
                        value={producto.tallas.find((t) => t.talla_id === talla.id)?.stock ?? ''}
                        onChange={(e) => handleTallaChange(e, talla)}
                        className={`w-32 p-2 border ${errores[talla.id] ? 'border-red-500' : 'border-gray-300'} rounded`}
                      />
                    </div>
                    {errores[talla.id] && (
                      <p className="text-sm text-red-500 mt-1">{errores[talla.id]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMostrarModalGestionTallas(true)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
            >
              + Nueva Talla
            </button>
          </div>
        </>
        
      )}
      


      {/* Botones de navegación */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onAnterior}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Anterior
        </button>
        <button
          onClick={handleSiguiente}
          disabled={validando}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition"
        >
          {validando ? 'Validando...' : 'Siguiente'}
        </button>
      </div>
      <ModalGestionTallas
        visible={mostrarModalGestionTallas}
        onClose={() => setMostrarModalGestionTallas(false)}
        refreshTallas={async () => {
          try {
            const response = await axios.get(`${API_URL}/api/tallas/obtener`, { withCredentials: true });
            setTallasDisponibles(response.data);
          } catch (error) {
            console.error("Error al refrescar tallas:", error);
          }
        }}
      />

    </div>
  );
};

export default PasoTallas;