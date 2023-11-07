import React from 'react';
import { Link } from 'react-router-dom';
import { FaHouse } from 'react-icons/fa6';
import { useHistorial } from '../context/HistorialContext';
import data from '../datos/data.json'; // Importa tu archivo JSON

const Presupuestos = () => {
  const { historialCotizaciones } = useHistorial();

  const getTipoPropiedad = (codigo) => {
    const tipo = data.find((item) => item.categoria === 'propiedad' && item.tipo === codigo)?.tipo;
    return tipo || 'Desconocido';
  };

  const getUbicacion = (codigo) => {
    const ubicacion = data.find((item) => item.categoria === 'ubicacion' && item.tipo === codigo)?.tipo;
    return ubicacion || 'Desconocida';
  };

  const formatFecha = (fecha) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(fecha).toLocaleString('es-ES', options);
  };

  // Función para formatear el precio sin decimales
  const formatPrecio = (precio) => {
    return precio.toFixed(0);
  };

  return (
    <section className="presupuestos">
      <nav>
        <Link to='/'>
          <FaHouse />
        </Link>
      </nav>
      <h1>Historial de Cotizaciones</h1>
      <section className='historial-container'>
        <section className='historial-titulos'>
          <article className='historial-titulo'>Fecha</article>
          <article className='historial-titulo'>Tipo de Propiedad</article>
          <article className='historial-titulo'>Ubicación</article>
          <article className='historial-titulo'>Cant. de días</article>
          <article className='historial-titulo'>Precio</article>
        </section>
        {historialCotizaciones.map((cotizacion, indice) => (
          <section className='historial-item' key={indice}>
            <article className='historial-valor'>{formatFecha(cotizacion.fecha)}</article>
            <article className='historial-valor'>{getTipoPropiedad(cotizacion.proyectoNombre)}</article>
            <article className='historial-valor'>{getUbicacion(cotizacion.clienteNombre)}</article>
            <article className='historial-valor'>{cotizacion.dias}</article>
            <article className='historial-valor'>${formatPrecio(cotizacion.cuenta)}</article>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Presupuestos;
