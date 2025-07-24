import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Función para mezclar array aleatoriamente (Fisher-Yates)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Cargar categorías
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos/categorias`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  // Obtener productos aleatorios
  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const res = await axios.get(`${API_URL}/api/productos/filtrar`);
        let productosFiltrados = res.data;

        // Filtrar por categoría si hay una seleccionada
        if (categoriaSeleccionada) {
          productosFiltrados = productosFiltrados.filter(
            (p) => p.subcategoria?.categoria?.id === categoriaSeleccionada
          );
        }

        // Mezclar los productos aleatoriamente
        const productosAleatorios = shuffleArray(productosFiltrados);
        
        // Limitar a 12 productos para no sobrecargar
        setProductos(productosAleatorios.slice(0, 12));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoriaSeleccionada]);

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">
          Explora por categoría
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => setCategoriaSeleccionada(null)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
              categoriaSeleccionada === null
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-400 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Todos
          </button>

          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
                categoriaSeleccionada === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Productos */}
        {cargando ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-semibold mb-2">Lo sentimos...</h3>
            <p className="text-gray-500">
              No hay productos disponibles para esta categoría.<br />Prueba seleccionando otra.
            </p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="!px-2 relative"
            >
              {productos.map((producto) => (
                <SwiperSlide key={producto.id}>
                  <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition text-left h-full">
                    <button 
                      onClick={() => navigate(`/producto/${producto.id}`)} 
                      className="w-full text-left"
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h4 className="font-bold text-gray-800 text-sm truncate">{producto.nombre}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{producto.descripcion}</p>
                      <p className="text-blue-600 font-semibold mt-1">${producto.precio}</p>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev !text-blue-600 !left-0"></div>
              <div className="swiper-button-next !text-blue-600 !right-0"></div>
            </Swiper>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            ¿No encontraste lo que buscabas? Explora nuestra tienda completa para descubrir todos los productos disponibles.
          </p>
          <button
            onClick={() => navigate("/cuerpo")}
            className="btn-principal"
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categorias;  