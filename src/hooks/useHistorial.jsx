import { useContext } from 'react';
import HistorialContext from '../context/HistorialContext'; // Asegúrate de ajustar la ruta al contexto del historial

const useHistorial = () => {
  const { historialCotizaciones, setHistorialCotizaciones } = useContext(HistorialContext);

  // Agrega funciones o lógica específica relacionada con el historial si es necesario

  return {
    historialCotizaciones,
    setHistorialCotizaciones,
  };
};

export default useHistorial;
