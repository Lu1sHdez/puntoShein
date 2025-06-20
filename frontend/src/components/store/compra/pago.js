import React, { useState } from 'react';
import { CreditCard, DollarSign, Smartphone, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Pago = () => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const metodos = [
    {
      id: 'tarjeta',
      nombre: 'Tarjeta de Crédito/Débito',
      icono: <CreditCard className="w-6 h-6" />,
    },
    {
      id: 'efectivo',
      nombre: 'Pago en efectivo (OXXO, 7-Eleven)',
      icono: <DollarSign className="w-6 h-6" />,
    },
    {
      id: 'transferencia',
      nombre: 'Transferencia bancaria',
      icono: <Smartphone className="w-6 h-6" />,
    },
    {
      id: 'contraEntrega',
      nombre: 'Pago contra entrega',
      icono: <Truck className="w-6 h-6" />,
    },
  ];

  const handleConfirmarPago = () => {
    if (!metodoSeleccionado) {
      Swal.fire('Método no seleccionado', 'Elige un método de pago', 'warning');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Pago confirmado',
      text: `Has seleccionado el método: ${metodos.find(m => m.id === metodoSeleccionado).nombre}`,
      confirmButtonText: 'Aceptar',
    }).then(() => {
      // Redirigir o limpiar carrito, etc.
      navigate('/usuario/dashboard'); // O a "gracias por tu compra"
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Finaliza tu compra</h1>

      {/* RESUMEN DE COMPRA */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>$500.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Envío:</span>
          <span>$50.00</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>$550.00</span>
        </div>
      </div>

      {/* MÉTODO DE PAGO */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Selecciona un método de pago</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metodos.map((metodo) => (
            <div
              key={metodo.id}
              onClick={() => setMetodoSeleccionado(metodo.id)}
              className={`cursor-pointer border rounded-lg p-4 flex items-center gap-4 transition hover:shadow-lg ${
                metodoSeleccionado === metodo.id ? 'border-pink-500 ring-2 ring-pink-300' : 'border-gray-300'
              }`}
            >
              {metodo.icono}
              <span className="font-medium">{metodo.nombre}</span>
            </div>
          ))}
        </div>

        {/* BOTÓN CONFIRMAR */}
        <div className="mt-8 text-center">
          <button
            onClick={handleConfirmarPago}
            className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg font-semibold transition"
          >
            Confirmar y pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
