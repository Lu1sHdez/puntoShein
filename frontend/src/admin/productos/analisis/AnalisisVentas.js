import { useEffect, useState } from 'react';
import axios from 'axios';
import TablaVentas from './TablaVentas';
import { API_URL } from '../../../ApiConexion';


import { useNavigate } from 'react-router-dom';


const AnalisisVentas = () => {

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tallas, setTallas] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [productoBase, setProductoBase] = useState(null);
  const [detalleProducto, setDetalleProducto] = useState(null);
  const navigate = useNavigate();

  


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos/categorias`);
        setCategorias(res.data || []);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);
  

  const handleCategoriaChange = async (e) => {
    const id = e.target.value;
    
    // Resetear todos los estados
    setCategoriaSeleccionada(id);
    setSubcategoriaSeleccionada(null);
    setProductoSeleccionado(null);
    setTallaSeleccionada(null);
    setDetalleProducto(null);
    setSubcategorias([]);
    setProductos([]);
    setTallas([]);
    setProductoBase(null);
  
    if (!id) return;
  
    try {
      const res = await axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${id}`);
      setSubcategorias(res.data);
    } catch (error) {
      console.error("Error al obtener subcategorías:", error);
      setSubcategorias([]);
    }
  };

  const handleSubcategoriaChange = async (e) => {
    const id = e.target.value;
    setSubcategoriaSeleccionada(id);
    setProductoSeleccionado(null);
    setTallaSeleccionada(null);
    setDetalleProducto(null);
    setProductoBase(null);
    setTallas([]);
    
    if (!id) {
      setProductos([]);
      return;
    }
  
    try {
      const res = await axios.get(`${API_URL}/api/productos/productosPorSubcategoria?subcategoria_id=${id}`);
      setProductos(res.data || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]);
    }
  };

  const puedePredecir = () => {
    if (!productoBase) return false;
    if (tallas.length === 0) return true; // No tiene tallas
    return tallaSeleccionada !== null;
  };
  
  

  const handleProductoChange = (e) => {
    const id = e.target.value;
    const producto = productos.find(p => p.id == id);
    
    if (!producto) {
      setProductoSeleccionado(null);
      setProductoBase(null);
      setTallas([]);
      setDetalleProducto(null);
      return;
    }
  
    setProductoSeleccionado(producto);
    setProductoBase(producto);
    setTallaSeleccionada(null);
    setDetalleProducto(null);
    setTallas(producto?.tallas || []);
  };  
  
  const handleTallaChange = async (e) => {
    const tallaId = e.target.value;
    setTallaSeleccionada(tallaId);
  
    if (!productoSeleccionado || !tallaId) {
      setDetalleProducto(null);
      return;
    }
  
    try {
      const res = await axios.get(`${API_URL}/api/productos/detallePorTalla?producto_id=${productoSeleccionado.id}&talla_id=${tallaId}`);
      setDetalleProducto(res.data || null);
    } catch (error) {
      console.error("Error al obtener detalle por talla:", error);
      setDetalleProducto(null);
    }
  };
  
  

  return (
    <div>
        <>
          {/* seccion de analisis de producto */}

          <section className="py-3 px-4 md:px-12">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8 border">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                  📊 Catálogo de Productos
                </h1>
                <div className="w-20 h-1.5 bg-blue-400 mx-auto rounded-full"></div>
              </div>

              {/* Selectores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={categoriaSeleccionada || ''}
                    onChange={handleCategoriaChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 text-sm"
                  >
                    <option value="">Selecciona</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* Subcategoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                  <select
                    value={subcategoriaSeleccionada || ''}
                    onChange={handleSubcategoriaChange}
                    disabled={!subcategorias.length}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 text-sm disabled:opacity-50"
                  >
                    <option value="">Selecciona</option>
                    {subcategorias.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                    ))}
                  </select>
                  {subcategorias.length === 0 && categoriaSeleccionada && (
                    <div className="flex items-center justify-center mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
                      <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      </svg>
                      <p className="text-sm text-yellow-800 font-medium">
                        Esta categoría no tiene subcategorías registradas.
                      </p>
                    </div>
                  )}

                </div>

                {/* Producto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                  <select
                    value={productoSeleccionado?.id || ''}
                    onChange={handleProductoChange}
                    disabled={!productos.length}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 text-sm disabled:opacity-50"
                  >
                    <option value="">Selecciona</option>
                    {productos.map(prod => (
                      <option key={prod.id} value={prod.id}>{prod.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tarjeta de Producto */}
              {productoBase && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-md">
                  <div className="md:flex">
                    <div className="md:w-1/2 p-6 flex justify-center items-center bg-white">
                      <img 
                        src={productoBase.imagen} 
                        alt={productoBase.nombre}
                        className="max-h-80 object-contain rounded-lg transform hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    <div className="md:w-1/2 p-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{productoBase.nombre}</h2>
                      
                      <div className="space-y-3 text-gray-700">
                        <p><span className="font-semibold text-gray-600">📄 Descripción:</span> {productoBase.descripcion}</p>
                        <p><span className="font-semibold text-gray-600">💰 Precio:</span> <span className="text-blue-600 font-bold">${productoBase.precio}</span></p>
                        <p><span className="font-semibold text-gray-600">🎨 Color:</span> <span className="capitalize">{productoBase.color}</span></p>
                        
                        <p>
                          <span className="font-semibold text-gray-600">📦 Stock:</span>{' '}
                          {detalleProducto ? (
                            <span className={detalleProducto.stock < 5 ? 'text-red-500 font-bold' : 'text-green-600 font-semibold'}>
                              {detalleProducto.stock} unidades
                            </span>
                          ) : (
                            <span className={productoBase.stock < 5 ? 'text-red-500 font-bold' : 'text-green-600 font-semibold'}>
                              {productoBase.stock} unidades
                            </span>
                          )}
                        </p>
                        
                        {detalleProducto?.talla && (
                          <p><span className="font-semibold text-gray-600">📏 Talla seleccionada:</span> <span className="font-medium">{detalleProducto.talla}</span></p>
                        )}
                        {productoSeleccionado && tallas.length === 0 && (
                          <div className="flex items-center justify-center mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
                            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                            <p className="text-sm text-yellow-800 font-medium">
                              Este producto no tiene tallas disponibles por el momento.
                            </p>
                          </div>
                        
                          )}

                      </div>

                      {/* Selector de Talla */}
                      {tallas.length > 0 && (
                        <div className="mt-8">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona talla:</label>
                          <div className="flex flex-wrap gap-2">
                            {tallas.map(t => (
                              <button
                                key={t.id}
                                onClick={() => handleTallaChange({ target: { value: t.id } })}
                                className={`px-4 py-2 rounded-lg border ${tallaSeleccionada === t.id 
                                  ? 'bg-blue-500 text-white border-blue-500' 
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
                              >
                                {t.nombre}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {puedePredecir() && (
              <TablaVentas
                productoId={productoBase?.id}
                tallaId={tallas.find(t => t.id == tallaSeleccionada)?.id || null}
              />
            )}
              </>

    </div>

  );
};

export default AnalisisVentas;