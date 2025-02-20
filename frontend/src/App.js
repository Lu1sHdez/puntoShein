// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";
import Layout from "./components/home/Layout";

//  Lazy Loading (Carga Diferida) para tus páginas principales
const DetalleProducto = lazy(() => import("./components/productos/DetalleProducto"));
const SeccionProductos = lazy(() => import("./components/productos/AllProductos"));
const AllProductos = lazy(() => import("./components/productos/AllProductos"));
const BuscarProductos = lazy(() => import("./components/productos/BuscarProductos")); 
const ProductosFiltrados = lazy(() => import("./components/productos/ProductosFiltrados")); 

const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const RecuperarPassword = lazy(() => import("./pages/RecuperarPassword"));
const RestablecerPassword = lazy(() => import("./pages/RestablecerPassword"));
const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));

//  Lazy Loading para páginas de tu carpeta "empresa"
const AcercaDe = lazy(() => import("./components/empresa/AcercaDe"));
const PreguntasFrecuentes = lazy(() =>
  import("./components/empresa/PreguntasFrecuentes")
);
const PoliticaPrivacidad = lazy(() =>
  import("./components/empresa/PoliticaPrivacidad")
);
//Documentos de la empresa
const Terminos = lazy(() => import("./components/empresa/Terminos"));
const DeslindeLegal = lazy(() => import("./components/empresa/DeslindeLegal"));
const Contacto = lazy(() => import("./components/empresa/Contacto"));
const Ayuda = lazy(() => import("./components/empresa/Ayuda"));
const MapaSitio = lazy(() => import("./components/empresa/MapaSitio"));


// Páginas de error
const Error404 = lazy(() => import("./components/error/Error404"));
const Error500 = lazy(() => import("./components/error/Error500"));
const Error400 = lazy(() => import("./components/error/Error400"));

//perfil de usuario
const PerfilUsuario = lazy(() => import("./usuario/perfil/perfil"));
const ActualizarPerfil = lazy(() => import("./usuario/perfil/actualizarPerfil"));




const App = () => {
  return (
    <Router>
      <Layout>
        <Container>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
              </div>
            }
          >
            <Routes>
              {/* Rutas existentes */}
              <Route path="/" element={<SeccionProductos />} />
              <Route path="/productos" element={<AllProductos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperarPassword" element={<RecuperarPassword />} />
              <Route path="/restablecerPassword" element={<RestablecerPassword />} />
              <Route path="/cerrar-sesion" element={<CerrarSesion />} />


               {/* Nueva ruta para la búsqueda de productos */}
               <Route path="/buscar" element={<BuscarProductos />} />
               <Route path="/productos/filtrados" element={<ProductosFiltrados />} />
               <Route path="/producto/:id" element={<DetalleProducto />} />

              {/* Rutas de información de la empresa */}
              <Route path="/acercaDe" element={<AcercaDe />} />
              <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/deslindeLegal" element={<DeslindeLegal />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/mapa-del-sitio" element={<MapaSitio />} />


              {/* Páginas de error */}
              <Route path="/error400" element={<Error400 />} />
              <Route path="/error500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />


              {/* Perfil de usuario */}
              <Route path="perfil" element={<PerfilUsuario />} />
              {/* Perfil de usuario */}
              <Route path="ActualizarPerfil" element={<ActualizarPerfil />} />
            </Routes>
          </Suspense>
        </Container>
      </Layout>
    </Router>
  );
};

export default App;
