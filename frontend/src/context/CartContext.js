import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../ApiConexion";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const actualizarCantidad = async (usuarioId) => {
    try {
      if (!usuarioId) return setCantidadCarrito(0);
      const res = await axios.get(`${API_URL}/api/carrito/cantidad/${usuarioId}`, { withCredentials: true });
      setCantidadCarrito(res.data.cantidad || 0);
    } catch (error) {
      setCantidadCarrito(0);
    }
  };

  return (
    <CartContext.Provider value={{ cantidadCarrito, actualizarCantidad }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usarlo fácilmente
export const useCart = () => useContext(CartContext);
