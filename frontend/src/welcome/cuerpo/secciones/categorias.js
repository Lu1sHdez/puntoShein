import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Mezcla aleatoria
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Obtener categorías
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

  // Obtener productos
  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const res = await axios.get(`${API_URL}/api/productos/filtrar`);
        let productosFiltrados = res.data;

        if (categoriaSeleccionada) {
          productosFiltrados = productosFiltrados.filter(
            (p) => p.subcategoria?.categoria?.id === categoriaSeleccionada
          );
        }

        const productosAleatorios = shuffleArray(productosFiltrados);
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
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* Fondo difuminado azul corporativo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-72"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10 animate-fade-in-up">
          Explora por categoría
        </h2>

        {/* Botones de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setCategoriaSeleccionada(null)}
            className={`px-4 py-2 rounded-full border text-sm sm:text-base font-medium transition-all duration-200 
              ${
                categoriaSeleccionada === null
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            Todos
          </button>

          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`px-4 py-2 rounded-full border text-sm sm:text-base font-medium transition-all duration-200 
                ${
                  categoriaSeleccionada === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Productos */}
        {cargando ? (
          <p className="text-gray-500 text-sm sm:text-base">
            Cargando productos...
          </p>
        ) : productos.length === 0 ? (
          <div className="text-center text-gray-700 py-10">
            <h3 className="text-xl font-semibold mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Prueba seleccionando otra categoría.
            </p>
          </div>
        ) : (
          <div className="relative animate-fade-in-up">
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="!px-2 relative"
            >
              {productos.map((producto) => (
                <SwiperSlide key={producto.id}>
                  <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-4 text-left h-full">
                    <button
                      onClick={() => navigate(`/producto/${slugify(producto.nombre)}`)
                    }
                      className="w-full text-left"
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-44 sm:h-48 object-cover rounded-md mb-3"
                      />
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {producto.nombre}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {producto.descripcion}
                      </p>
                      <p className="text-blue-600 font-semibold mt-1 text-sm sm:text-base">
                        ${producto.precio}
                      </p>
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
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base max-w-lg mx-auto">
            ¿No encontraste lo que buscabas? Explora nuestra tienda completa
            para descubrir todos los productos disponibles.
          </p>
          <button
            onClick={() => navigate("/cuerpo")}
            className="btn-principal"
          >
            Ver todos los productos
          </button>
        </div>
      </div>

      {/* Fondo inferior difuminado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-25rem)]"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25 
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default Categorias;
