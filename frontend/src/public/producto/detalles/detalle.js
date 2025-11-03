import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import CargandoBarra from "../../../Animations/CargandoBarra";
import useSesionUsuario from "../../../context/useSesionUsuario";
import { procesarAgregarAlCarrito } from "../carrito/agregar";
import { toast } from "react-toastify";
import ModalAutenticacion from "../../autenticacion/Autenticacion";
import CargandoModal from "../../../Animations/CargandoModal";
import ModalMensaje from "../../../modal/Modal";
import { useCart } from "../../../context/CartContext";
import SeccionRecomendaciones from "../../../welcome/cuerpo/secciones/SeccionRecomendaciones";

// Componentes hijos
import ImagenProducto from "./imagen";
import InformacionProducto from "./informacion";
import AccionesProducto from "./acciones";

const DetalleProducto = () => {
  const { nombreSlug  } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargandoModal, setCargandoModal] = useState(false);
  const [modalTallaVisible, setModalTallaVisible] = useState(false);
  const [tallaErrorVisual, setTallaErrorVisual] = useState(false);

  const { id: usuarioId } = useSesionUsuario();
  const { actualizarCantidad } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos/buscar/${nombreSlug}`);
        setProducto(res.data);
        if (res.data?.nombre) {
          document.title = `${res.data.nombre} | Punto Shein`;
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setCargando(false);
      }
    };
    
    fetchProducto();
    return () => {
      document.title = "Punto Shein";
    };
  }, [nombreSlug]);
  

  // === Función para agregar al carrito ===
  const handleAgregarCarrito = async () => {
    setCargandoModal(true);

    const resultado = await procesarAgregarAlCarrito({
      usuario_id: usuarioId,
      producto_id: producto.id,
      talla_id: tallaSeleccionada,
      cantidad: 1,
      token: localStorage.getItem("token"),
    });

    setCargandoModal(false);

    if (resultado.requiresLogin) {
      setMostrarModal(true);
      return;
    }

    if (!resultado.ok) {
      if (resultado.error === "Debes seleccionar una talla antes de continuar.") {
        setModalTallaVisible(true);
        setTallaErrorVisual(true);
        setTimeout(() => setTallaErrorVisual(false), 3000);
      } else {
        toast.error(resultado.error);
      }
      return;
    }

    actualizarCantidad(usuarioId);
    toast.success("Producto agregado al carrito.");
  };

  if (cargando) return <CargandoBarra />;

  if (!producto) {
    return (
      <div className="text-center text-gray-500 py-10">
        Producto no encontrado.
      </div>
    );
  }

  const { nombre, descripcion, precio, imagen, color, stock, subcategoria, tallas } = producto;

  return (
    <section className="relative isolate overflow-hidden bg-white pt-8 sm:pt-10 pb-20 sm:pb-28">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 animate-fade-in-up">
        {/* Migas de pan */}
        <nav
          className="text-sm mb-10 text-gray-600  flex flex-wrap gap-1 items-center justify-center sm:justify-start"
          aria-label="Ruta de navegación"
        >
          <Link to="/" className="hover:underline hover:text-blue-700 transition-colors duration-200">Inicio</Link>
          <span>&gt;</span>
          <Link to="/cuerpo" className="hover:underline hover:text-blue-700 transition-colors duration-200">Productos</Link>

          {subcategoria?.categoria && (
            <>
              <span>&gt;</span>
              <Link
                to={`/cuerpo?categoria=${subcategoria.categoria.id}`}
                className="hover:underline hover:text-blue-700 transition-colors duration-200"
              >
                {subcategoria.categoria.nombre}
              </Link>
            </>
          )}

          {subcategoria && (
            <>
              <span>&gt;</span>
              <Link
                to={`/cuerpo?subcategoria=${subcategoria.id}`}
                className="hover:underline hover:text-blue-700 transition-colors duration-200"
              >
                {subcategoria.nombre}
              </Link>
            </>
          )}

          <span>&gt;</span>
          <span className="text-blue-800 font-semibold truncate">{nombre}</span>
        </nav>

        {/* Contenedor principal */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 bg-blue-50/40 p-6 sm:p-10 rounded-2xl shadow-md 
                     hover:shadow-lg transition-all duration-500 backdrop-blur-sm"
        >
          {/* Imagen del producto */}
          <div className="animate-fade-in-up">
            <ImagenProducto imagen={imagen} nombre={nombre} />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-between gap-6 animate-fade-in-up [animation-delay:0.1s]">
            <InformacionProducto
              nombre={nombre}
              descripcion={descripcion}
              precio={precio}
              color={color}
              stock={stock}
              tallas={tallas}
              tallaSeleccionada={tallaSeleccionada}
              setTallaSeleccionada={setTallaSeleccionada}
              tallaErrorVisual={tallaErrorVisual}
            />
          </div>

          {/* Acciones */}
          <div className="animate-fade-in-up [animation-delay:0.2s]">
            <AccionesProducto handleAgregarCarrito={handleAgregarCarrito} />
          </div>
        </div>

        {/* Modal: advertencia de talla */}
        <ModalMensaje
          visible={modalTallaVisible}
          tipo="advertencia"
          titulo="Talla no seleccionada"
          mensaje="Debes seleccionar una talla antes de agregar el producto al carrito."
          textoConfirmar="Entendido"
          onConfirmar={() => setModalTallaVisible(false)}
        />

        {/* Modal: autenticación */}
        {mostrarModal && (
          <ModalAutenticacion onClose={() => setMostrarModal(false)} />
        )}

        {/* Modal: carga */}
        {cargandoModal && (
          <CargandoModal mensaje="Agregando al carrito..." visible={cargandoModal} />
        )}

        {/* Sección de recomendaciones */}
        <div className="mt-20 animate-fade-in-up [animation-delay:0.3s]">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            También te puede interesar
          </h3>
          <SeccionRecomendaciones productoId={Number(producto.id)} />
        </div>
      </div>

      {/* Fondo difuminado inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 
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

export default DetalleProducto;
