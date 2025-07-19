import React from "react";

const CargandoBarra = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-blue-100 overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-600 animate-bar-slide rounded-r-full shadow-md"></div>
    </div>
  );
};

export default CargandoBarra;
