import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import CargandoBarra from "../../../Animations/CargandoBarra";
import { agregarAlCarrito } from "../carrito/agregar";
import useSesionUsuario from "../../../context/useSesionUsuario";
import ModalAutenticacion from "../../autenticacion/Autenticacion";
import CargandoModal from "../../../Animations/CargandoModal";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cargandoCarrito, setCargandoCarrito] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { usuarioAutenticado, id: usuarioId } = useSesionUsuario();

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

  const handleAgregarCarrito = async () => {
    if (!usuarioAutenticado) {
      setMostrarModal(true);
      return;
    }
    setCargandoCarrito(true);
    try {
      await agregarAlCarrito({ producto_id: id, usuario_id: usuarioId });
    } catch (error) {
      alert("Error al agregar al carrito.");
    } finally {
      setCargandoCarrito(false);
    }
  };

  const handleComprarAhora = async () => {
    if (!usuarioAutenticado) {
      setMostrarModal(true);
      return;
    }
    await handleAgregarCarrito();
    navigate("/carrito"); // o "/checkout" si tienes esa ruta
  };

  if (cargando) return <CargandoBarra />;
  if (!producto) {
    return <div className="text-center text-gray-500 py-10">Producto no encontrado.</div>;
  }

  const {
    nombre,
    descripcion,
    precio,
    imagen,
    color,
    stock,
    subcategoria,
    tallas
  } = producto;


  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
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

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
        {/* Imagen responsiva */}
        <div className="w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4] overflow-hidden rounded shadow">
        <img
            src={imagen}
            alt={`Imagen de ${nombre}`}
            className="w-full h-full object-cover object-center rounded transition-transform duration-300 ease-in-out hover:scale-105"
        />
        </div>


        {/* Detalles */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{nombre}</h1>
            <p className="text-gray-700 text-base mb-4">{descripcion}</p>

            <p className="text-lg font-semibold text-green-600 mb-2">
              Precio: ${precio}
            </p>
            <p className="text-gray-600 mb-1">Color: <span className="capitalize">{color}</span></p>
            <p className={`text-sm font-medium mb-2 ${stock > 0 ? 'text-gray-600' : 'text-red-500'}`}>
              Stock total: {stock > 0 ? stock : 'Agotado'}
            </p>

            {/* Tallas */}
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700">Tallas disponibles:</p>
              {tallas && tallas.length > 0 ? (
                <ul className="list-disc ml-6 mt-1 text-sm text-gray-600">
                  {tallas.map((t) => (
                    <li key={t.id}>
                      Talla <strong>{t.nombre}</strong> — Stock: {t.stock}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No hay tallas registradas.</p>
              )}
            </div>

          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleAgregarCarrito}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              Agregar al carrito
            </button>
            <button
              onClick={handleComprarAhora}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Continuar con la compra
            </button>
            <Link
              to="/cuerpo"
              className="text-sm text-blue-600 hover:underline text-center mt-2"
            >
              ← Volver a productos
            </Link>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <ModalAutenticacion onClose={() => setMostrarModal(false)} />
      )}
      {cargandoCarrito && (
        <CargandoModal mensaje="Agregando al carrito..." visible={cargandoCarrito} />
      )}
    </div>
  );
};

export default DetalleProducto;
