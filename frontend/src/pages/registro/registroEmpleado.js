import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Formulario from '../../formulario/formulario';
import { API_URL } from '../../ApiConexion';
import { camposEmpleadoRegistro } from '../../formulario/campos';
import CargandoModal from '../../Animations/CargandoModal';
import ModalExitoEmpleado from './components/ModalExitoEmpleado';


const RegistroEmpleado = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [exito, setExito] = useState(false);
  const [correo, setCorreo] = useState('');
  const [valores, setValores] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    password: '',
    telefono: '',
    ubicacion: '',
    genero: '',
  });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [errorServidor, setErrorServidor] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  
  // Cargar correo desde el backend al iniciar
  useEffect(() => {
    const obtenerCorreo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/empleado/obtenerCorreoDesdeToken?token=${token}`);
        setCorreo(res.data.correo);

        // Ocultar token de la URL solo si es válido
        const cleanUrl = window.location.origin + "/registro/e";
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (error) {
        setErrorServidor('Token inválido o expirado.');
        navigate('/error404'); // ⬅️ Redirige si el token no es válido
      }
    };

    if (token) {
      obtenerCorreo();
    } else {
      setErrorServidor('Token no proporcionado.');
      navigate('/error404');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (['nombre', 'apellido_paterno', 'apellido_materno'].includes(name)) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return; // Solo letras y espacios
    }
    
    // Validación en vivo por tipo de campo
    if (name === 'telefono') {
      if (!/^\d*$/.test(value)) return; // Solo números
      if (value.length > 10) return; // Máximo 10 dígitos
    }
  
    setValores((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    setMensaje('');
    setErrorServidor('');
    setEnviando(true);

    try {
      const res = await axios.post(`${API_URL}/api/empleado/registro`, {
        ...valores,
        token,
      });

      setExito(true);
    } catch (error) {
      const resData = error.response?.data;
      if (resData?.errores) {
        setErrores(resData.errores);
      } else {
        setErrorServidor(resData?.mensaje || 'Error en el registro.');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <CargandoModal visible={enviando} mensaje="Procesando registro..." />

      <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto mt-4 sm:mt-0">        
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de empleado</h2>

        {correo && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Correo electrónico</label>
            <input
              type="text"
              value={correo}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        <Formulario
          campos={camposEmpleadoRegistro}
          valores={valores}
          errores={errores}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ocultarBoton={true}
          botonesPersonalizados={
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="btn-principal px-6 py-2"
                disabled={enviando}
              >
                {enviando ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          }
        />

        {mensaje && (
          <p className="text-center text-green-600 mt-4 font-medium">{mensaje}</p>
        )}
        {errorServidor && (
          <p className="text-center text-red-600 mt-4 font-medium">{errorServidor}</p>
        )}
      </div>
      </section>
      <ModalExitoEmpleado visible={exito} onClose={() => navigate('/')} />

    </>
  );
};

export default RegistroEmpleado;
