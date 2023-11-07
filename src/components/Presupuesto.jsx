import React from 'react';

const Presupuesto = ({ fechaCotizacion, categoriaPropiedad, tipoPropiedad, categoriaUbicacion, tipoUbicacion, metrosCuadrados, poliza }) => {
  const tipoPropiedadTexto = {
    proyecto: 'Proyecto',
    propiedad: 'Propiedad',
  };

  const ubicacionTexto = {
    cliente: 'Cliente',
    ubicacion: 'Ubicación',
  };

  return (
    <li>
      <ul>
        <p>Fecha de Cotización: {fechaCotizacion}</p>
        <p>Tipo de Propiedad: {tipoPropiedadTexto[tipoPropiedad]}</p>
        <p>Ubicación: {ubicacionTexto[tipoUbicacion]}</p>
        <p>Metros Cuadrados: {metrosCuadrados}</p>
        <p>Póliza Mensual: ${poliza}</p>
      </ul>
    </li>
  );
};

export default Presupuesto;
