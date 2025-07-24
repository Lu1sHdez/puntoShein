const ImagenProducto = ({ imagen, nombre }) => (
    <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 aspect-[3/4] overflow-hidden rounded shadow mx-auto">
      <img
        src={imagen}
        alt={`Imagen de ${nombre}`}
        className="w-full h-full object-cover object-center rounded transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>
  );
  
  export default ImagenProducto;
  