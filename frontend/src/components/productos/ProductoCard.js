import React from "react";
import { useNavigate } from "react-router-dom";


const ProductoCard = ({ producto }) => {
    const navigate = useNavigate();

    const handleVerDetalles = () => {
        navigate(`/producto/${producto.id}`); // 🔗 Redirige a la página de detalles del producto
    };


    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
        <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover" />
        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
        <p className="text-gray-500">{producto.descripcion}</p>
        <p className="text-pink-600 font-bold">${producto.precio}</p>
        <button className="mt-2 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
            Agregar al carrito
            </button>
            {/* 🔗 Botón que redirige a la página de detalles */}
            <button 
                onClick={handleVerDetalles}
                className="mt-2 w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100 transition">
                Ver detalles
            </button>
        </div>
    );
    };

export default ProductoCard;
