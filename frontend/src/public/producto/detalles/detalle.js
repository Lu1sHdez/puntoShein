  import React, { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import axios from "axios";
  import { API_URL } from "../../../ApiConexion";
  import CargandoBarra from "../../../Animations/CargandoBarra";
  import useSesionUsuario from "../../../context/useSesionUsuario"; 
  import { procesarAgregarAlCarrito } from "../carrito/agregar"; // reemplaza import anterior
  import { toast } from "react-toastify";
  import ModalAutenticacion from "../../autenticacion/Autenticacion";
  import CargandoModal from "../../../Animations/CargandoModal";
  import ModalMensaje from "../../../modal/Modal"; // ajusta la ruta si es necesario

  const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargandoModal, setCargandoModal] = useState(false);
    const [modalTallaVisible, setModalTallaVisible] = useState(false);
    const [tallaErrorVisual, setTallaErrorVisual] = useState(false);

    const { id: usuarioId} = useSesionUsuario();

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
          setTimeout(() => setTallaErrorVisual(false), 3000); // Quitar el borde tras 3s
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
              <p className={`text-xl font-medium mb-2 ${stock > 0 ? 'text-black' : 'text-red-500'}`}>
                Stock total disponible: {stock > 0 ? `${stock} unidades` : 'Agotado'}
              </p>

              {/* Tallas como checkboxes visuales */}
              <div className="mb-3">
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Selecciona una talla:
                </label>

                {tallas && tallas.length > 0 ? (
                  <div className={`flex flex-wrap gap-3 p-2 rounded ${tallaErrorVisual ? 'border border-red-500' : ''}`}>
                    {tallas.map((t) => {
                      const seleccionada = tallaSeleccionada === String(t.id);
                      const agotada = t.stock <= 0;
                      return (
                        <label
                          key={t.id}
                          className={`cursor-pointer px-4 py-2 border rounded text-sm font-medium
                            ${agotada ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}
                            ${seleccionada && !agotada ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 hover:border-blue-400'}
                          `}
                        >
                          <input
                            type="checkbox"
                            disabled={agotada}
                            checked={seleccionada}
                            onChange={() =>
                              setTallaSeleccionada(seleccionada ? "" : String(t.id))
                            }
                            className="hidden"
                          />
                          Talla {t.nombre} ({t.stock})
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No hay tallas registradas.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button className="btn-principal" onClick={handleAgregarCarrito}>
                Agregar al carrito
              </button>
              <button className="btn-secundario" disabled>
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
      </div> 
    );
  };
  export default DetalleProducto;
