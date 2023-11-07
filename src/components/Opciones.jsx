import React from 'react';
import { useCotizador } from '../hooks/useCotizador';

const Opciones = ({ datos, label, tipo }) => {
  const { elementos, setElementos } = useCotizador();

  const handleChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const elementoSeleccionado = datos.find((elemento) => elemento.factor === value);
    setElementos({ ...elementos, [tipo]: value, [`${tipo}Nombre`]: elementoSeleccionado ? elementoSeleccionado.tipo : '' });
  };

  return (
    <section className='opciones'>
      <label htmlFor={tipo} className={'formText'}>
        {label}
      </label>
      <select name={tipo} id={tipo} value={elementos[tipo]} onChange={handleChange} className={'opcionesBox'}>
        <option value={0}>...</option>
        {datos.map((elemento) => (
          <option key={elemento.tipo} value={elemento.factor} className={'formOption'}>
            {elemento.tipo}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Opciones;
