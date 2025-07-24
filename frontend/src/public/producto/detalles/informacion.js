const InformacionProducto = ({
    nombre,
    descripcion,
    precio,
    color,
    stock,
    tallas,
    tallaSeleccionada,
    setTallaSeleccionada,
    tallaErrorVisual,
  }) => (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{nombre}</h1>
      <p className="text-gray-700 text-base mb-4">{descripcion}</p>
      <p className="text-lg font-semibold text-green-600 mb-2">Precio: ${precio}</p>
      <p className="text-gray-600 mb-1">Color: <span className="capitalize">{color}</span></p>
      <p className={`text-xl font-medium mb-2 ${stock > 0 ? 'text-black' : 'text-red-500'}`}>
        Stock total disponible: {stock > 0 ? `${stock} unidades` : 'Agotado'}
      </p>
  
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
  );
  
  export default InformacionProducto;
  