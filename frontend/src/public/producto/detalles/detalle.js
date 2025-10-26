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
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargandoModal, setCargandoModal] = useState(false);
  const [modalTallaVisible, setModalTallaVisible] = useState(false);
  const [tallaErrorVisual, setTallaErrorVisual] = useState(false);

  const { id: usuarioId } = useSesionUsuario();
  const { actualizarCantidad } = useCart();

  // === Obtener producto desde API ===
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos/obtener/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [id]);

  // === Función para agregar al carrito ===
  const handleAgregarCarrito = async () => {
    setCargandoModal(true);

    const resultado = await procesarAgregarAlCarrito({
      usuario_id: usuarioId,
      producto_id: id,
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
    <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-10 bg-gray-50 min-h-screen animate-fade-in-up">
      {/* Migas de pan */}
      <nav
        className="text-sm mb-6 text-gray-600 flex flex-wrap gap-1 items-center"
        aria-label="Ruta de navegación"
      >
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <span>&gt;</span>
        <Link to="/cuerpo" className="hover:underline">
          Productos
        </Link>
        {subcategoria?.categoria && (
          <>
            <span>&gt;</span>
            <Link
              to={`/cuerpo?categoria=${subcategoria.categoria.id}`}
              className="hover:underline"
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
              className="hover:underline"
            >
              {subcategoria.nombre}
            </Link>
          </>
        )}
        <span className="text-gray-800 font-semibold truncate">{nombre}</span>
      </nav>

      {/* Contenedor principal */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg
        hover:shadow-xl transition-all duration-500 ease-in-out backdrop-blur-md"
      >
        {/* Imagen del producto */}
        <div className="animate-fade-in-up">
          <ImagenProducto imagen={imagen} nombre={nombre} />
        </div>

        {/* Información */}
        <div className="flex flex-col justify-between gap-6 animate-fade-in-up">
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
        <div className="animate-fade-in-up">
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
      {mostrarModal && <ModalAutenticacion onClose={() => setMostrarModal(false)} />}

      {/* Modal: carga */}
      {cargandoModal && (
        <CargandoModal mensaje="Agregando al carrito..." visible={cargandoModal} />
      )}

      {/* Sección de productos recomendados */}
      <div className="mt-14 animate-fade-in-up">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          También te puede interesar
        </h3>
        <SeccionRecomendaciones productoId={Number(producto.id)} />
      </div>
    </section>
  );
};

export default DetalleProducto;
