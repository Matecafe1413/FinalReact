import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const HistorialContext = createContext();

export const useHistorial = () => {
  return useContext(HistorialContext);
};



export const HistorialProvider = ({ children }) => {
  const [historialCotizaciones, setHistorialCotizaciones] = useLocalStorage('historialCotizaciones', []); // Aquí utilizas useLocalStorage para obtener los datos del historial

  return (
    <HistorialContext.Provider value={{ historialCotizaciones, setHistorialCotizaciones }}>
      {children}
    </HistorialContext.Provider>
  );
};

