import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { BsGeoAltFill, BsTelephoneFill, BsEnvelopeFill, BsClockFill, BsPinMapFill } from "react-icons/bs";
import "leaflet/dist/leaflet.css";

// === Icono personalizado del mapa ===
const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// === Función para calcular distancia (Haversine) ===
const calcularDistancia = (coord1, coord2) => {
  const R = 6371; // radio de la Tierra en km
  const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((coord1[0] * Math.PI) / 180) *
      Math.cos((coord2[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// === Componente del mapa ===
const MapaUbicacion = ({ tienda, usuario }) => {
  const line = usuario ? [tienda, usuario] : null;

  return (
    <MapContainer
      center={usuario || tienda}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={tienda} icon={icon}>
        <Popup>
          <b>Punto Shein</b>
          <br />
          Huejutla de Reyes, Hidalgo
        </Popup>
      </Marker>

      {usuario && (
        <Marker position={usuario} icon={icon}>
          <Popup>
            <b>Tu ubicación actual</b>
          </Popup>
        </Marker>
      )}

      {line && <Polyline positions={line} color="#2563eb" weight={4} opacity={0.7} />}
    </MapContainer>
  );
};

// === Componente principal ===
const Contacto = () => {
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [usandoGPS, setUsandoGPS] = useState(false);
  const [error, setError] = useState("");
  const [distancia, setDistancia] = useState(null);

  const ubicacionTienda = [21.14100226747049, -98.41927303482731];

  // Obtener ubicación actual
  const obtenerMiUbicacion = () => {
    if ("geolocation" in navigator) {
      setUsandoGPS(true);
      setError("");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUbicacionUsuario(coords);
          const km = calcularDistancia(coords, ubicacionTienda);
          setDistancia(km.toFixed(2));
          setUsandoGPS(false);
        },
        (err) => {
          console.error("Error al obtener ubicación:", err);
          setError("No se pudo acceder a tu ubicación. Revisa los permisos del navegador.");
          setUsandoGPS(false);
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
    }
  };

  // Calcular tiempos estimados
  const calcularTiempo = (km) => {
    const tiempoAuto = km / 40; // km/h
    const tiempoCaminando = km / 5;
    return {
      auto: Math.round(tiempoAuto * 60),
      caminando: Math.round(tiempoCaminando * 60),
    };
  };

  const tiempos = distancia ? calcularTiempo(distancia) : null;

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr 
                     from-blue-400 to-blue-700 opacity-25 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 animate-fade-in-up text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-8">
          Contáctanos
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-justify text-base sm:text-lg">
          Nos encontramos en <b>Huejutla de Reyes, Hidalgo</b>.  
          Puedes visualizar nuestra ubicación y estimar el tiempo de llegada desde tu posición.
        </p>

        {/* Mapa */}
        <div className="mb-10">
          <MapaUbicacion tienda={ubicacionTienda} usuario={ubicacionUsuario} />
        </div>

        {/* Botón GPS */}
        <button
          onClick={obtenerMiUbicacion}
          disabled={usandoGPS}
          className="btn-principal px-6 py-3 rounded-lg shadow-md hover:scale-105 transition disabled:opacity-70"
        >
          {usandoGPS ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
        </button>

        {/* Mensajes dinámicos */}
        <div className="mt-6 text-gray-700 text-sm sm:text-base space-y-1">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {ubicacionUsuario && (
            <>
              <p><BsPinMapFill className="inline text-blue-600 mr-1" />Tu ubicación: {ubicacionUsuario[0].toFixed(4)}, {ubicacionUsuario[1].toFixed(4)}</p>
              <p><BsGeoAltFill className="inline text-blue-600 mr-1" />Distancia aproximada: <b>{distancia} km</b></p>
              {tiempos && (
                <>
                  <p><BsClockFill className="inline text-blue-600 mr-1" />En auto: <b>{tiempos.auto} min</b></p>
                  <p><BsClockFill className="inline text-blue-600 mr-1" />Caminando: <b>{tiempos.caminando} min</b></p>
                </>
              )}
            </>
          )}
        </div>

        {/* Datos de contacto */}
        <div className="mt-12 text-gray-700 text-base sm:text-lg space-y-3 text-left sm:text-center mx-auto max-w-md">
          <div className="flex items-center justify-center gap-2">
            <BsGeoAltFill className="text-blue-600" />
            <p><b>Dirección:</b> Huejutla de Reyes, Hidalgo, México</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <BsTelephoneFill className="text-blue-600" />
            <p><b>Teléfono:</b> +52 771 123 4567</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <BsEnvelopeFill className="text-blue-600" />
            <p><b>Correo:</b> puntosheinhuejutla@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
