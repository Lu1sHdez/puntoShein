import { jwtDecode } from "jwt-decode";

export const verificarExpToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const ahora = Date.now() / 1000;
      if (decoded.exp < ahora) {
        localStorage.removeItem("token");
        window.location.href = "/logout";
      }
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/logout";
    }
  }
};
