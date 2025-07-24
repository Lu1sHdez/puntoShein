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
import SeccionRecomendaciones from "../../../welcome/cuerpo/secciones/SeccionRecomendaciones";

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
  };

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

  if (cargando) return <CargandoBarra />;
  if (!producto) {
    return <div className="text-center text-gray-500 py-10">Producto no encontrado.</div>;
  }

  const { nombre, descripcion, precio, imagen, color, stock, subcategoria, tallas } = producto;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Migas de pan */}
      <nav className="text-sm mb-6 text-gray-600">
        <Link to="/" className="hover:underline">Inicio</Link> &gt;{" "}
        <Link to="/cuerpo" className="hover:underline">Productos</Link> &gt;{" "}
        {subcategoria?.categoria && (
          <>
            <Link to={`/cuerpo?categoria=${subcategoria.categoria.id}`} className="hover:underline">
              {subcategoria.categoria.nombre}
            </Link>{" "}
            &gt;{" "}
          </>
        )}
        {subcategoria && (
          <>
            <Link to={`/cuerpo?subcategoria=${subcategoria.id}`} className="hover:underline">
              {subcategoria.nombre}
            </Link>{" "}
            &gt;{" "}
          </>
        )}
        <span className="text-gray-800 font-semibold">{nombre}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow">
        <div>
          <ImagenProducto imagen={imagen} nombre={nombre} />
        </div>

        {/* Información + botones (apilados) */}
        <div className="flex flex-col gap-6 justify-between">
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
        <div>
              <AccionesProducto handleAgregarCarrito={handleAgregarCarrito} />
          </div>
      </div>

      <ModalMensaje
        visible={modalTallaVisible}
        tipo="advertencia"
        titulo="Talla no seleccionada"
        mensaje="Debes seleccionar una talla para continuar con la compra o agregar al carrito"
        textoConfirmar="Entendido"
        onConfirmar={() => setModalTallaVisible(false)}
      />
      {mostrarModal && <ModalAutenticacion onClose={() => setMostrarModal(false)} />}
      {cargandoModal && <CargandoModal mensaje="Agregando al carrito..." visible />}
      <SeccionRecomendaciones productoId={Number(producto.id)} />
    </div>
  );
};

export default DetalleProducto;
