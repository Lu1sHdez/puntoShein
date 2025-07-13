import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [colapsado, setColapsado] = useState(false);

  return (
    <SidebarContext.Provider value={{ colapsado, setColapsado }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
