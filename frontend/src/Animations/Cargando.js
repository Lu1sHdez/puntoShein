import React from 'react';

export const Cargando = ({ message = 'Cargando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in-up">
        <div className="flex space-x-2 mb-4">
          <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-gray-700 dark:text-gray-200 text-base font-semibold animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

