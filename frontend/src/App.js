// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";
import Layout from "./components/Layout";

// ⏳ Lazy Loading (Carga Diferida) para tus páginas principales
const SeccionProductos = lazy(() => import("./components/SeccionProductos"));
const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const RecuperarPassword = lazy(() => import("./pages/RecuperarPassword"));
const RestablecerPassword = lazy(() => import("./pages/RestablecerPassword"));
const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));

// ⏳ Lazy Loading para páginas de tu carpeta "empresa"
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

// Páginas de error
const Error404 = lazy(() => import("./components/error/Error404"));
const Error500 = lazy(() => import("./components/error/Error500"));
const Error400 = lazy(() => import("./components/error/Error400"));


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
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperarPassword" element={<RecuperarPassword />} />
              <Route path="/restablecerPassword" element={<RestablecerPassword />} />
              <Route path="/cerrar-sesion" element={<CerrarSesion />} />

              {/* Rutas de información de la empresa */}
              <Route path="/acercaDe" element={<AcercaDe />} />
              <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/deslindeLegal" element={<DeslindeLegal />} />
              <Route path="/contacto" element={<Contacto />} />

              {/* Páginas de error */}
              <Route path="/error400" element={<Error400 />} />
              <Route path="/error500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />


            </Routes>
          </Suspense>
        </Container>
      </Layout>
    </Router>
  );
};

export default App;
