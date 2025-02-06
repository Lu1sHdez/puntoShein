import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const Chat = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {/* Botón flotante para abrir el chat */}
      <button
        className="bg-pink-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setAbierto(!abierto)}
      >
        <FaCommentDots size={24} />
      </button>

      {/* Ventana de chat */}
      {abierto && (
        <div className="absolute bottom-12 right-0 bg-white w-80 p-4 rounded-lg shadow-lg text-black">
          <h3 className="text-lg font-bold">Chat de soporte</h3>
          <p>Escríbenos y te responderemos pronto.</p>
          <textarea className="w-full h-24 p-2 border rounded-md mt-2"></textarea>
          <button className="mt-2 bg-pink-600 text-white py-1 px-3 rounded-lg">
            Enviar mensaje
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
