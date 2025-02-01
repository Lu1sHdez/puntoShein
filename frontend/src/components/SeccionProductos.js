import React from "react";

const productos = [
  { id: 1, nombre: "Vestido Elegante", precio: "$35.99", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/29/b5/c137bf85b4f9bae825a99f557eee29b5.jpg" },
  { id: 2, nombre: "Camisa Casual", precio: "$25.50", imagen: "https://lendthetrend.mx/cdn/shop/files/evelyn-azul-venta-renta-de-vestidos-mexico-lend-the-trend-877337.jpg?v=1718219210&width=1000" },
  { id: 3, nombre: "Jeans Ajustados", precio: "$40.00", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/a3/31/c49d0b1ebbcdb48d15aa1a5a3dffa331.jpg" },
  { id: 4, nombre: "Vestido Largo", precio: "$50.00", imagen: "https://image.made-in-china.com/202f0j00uezYymbJSPcK/Two-Pieces-Women-Maxi-Dress-Hot-Sales-Ladies-Fashion-Dresses-High-Quality-Party-Evening-Dress.webp" },
  { id: 5, nombre: "Vestido de Gala", precio: "$60.00", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/fe/45/c90681ff3fd19c94674519f035e3fe45.jpg" },
  { id: 6, nombre: "Abrigo Elegante", precio: "$70.00", imagen: "https://down-mx.img.susercontent.com/file/sg-11134202-7rccw-lt6fnhs75ewj22" },
];

const SeccionProductos = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{producto.nombre}</h2>
              <p className="text-gray-500">{producto.precio}</p>
              <button className="mt-2 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                Agregar al carrito
              </button>
              <button className="mt-2 w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100 transition">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionProductos;
