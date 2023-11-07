import { useState, useContext } from 'react';
import CotizadorContext from '../context/CotizadorContext';

export function useCotizador() {
  const { elementos, setElementos } = useContext(CotizadorContext);

  return {
    elementos,
    setElementos,
  };
}
