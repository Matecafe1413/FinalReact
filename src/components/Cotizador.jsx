import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Opciones from './Opciones';
import { useCotizador } from '../hooks/useCotizador';
import Swal from 'sweetalert2';
import { useHistorial } from '../context/HistorialContext';
import { FaFloppyDisk } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/Fa';

const Cotizador = () => {
  const { elementos, setElementos } = useCotizador();
  const [datos, setDatos] = useState([]);
  const [precio, setPrecio] = useState(0);
  const { historialCotizaciones, setHistorialCotizaciones } = useHistorial();

  const realizarCotizacion = () => {
    const { proyecto, cliente, dias, proyectoNombre, clienteNombre } = elementos;
    if (proyecto === 0 || cliente === 0 || dias < 20 || proyectoNombre === '' || clienteNombre === '') {
      Swal.fire('Error', 'Debes completar los datos necesarios.', 'error');
      setPrecio(0);
      if (dias < 20) {
        setElementos({ ...elementos, dias: 20 });
      }
    } else {
      const cuenta = 5000 * proyecto * cliente * dias;
      setPrecio(cuenta);
    }
  };

  const guardarCotizacion = () => {
    const { proyecto, cliente, proyectoNombre, clienteNombre } = elementos;

    const nuevaCotizacion = {
      fecha: new Date().toLocaleString(),
      proyecto: proyecto,
      cliente: cliente,
      proyectoNombre: proyectoNombre,
      clienteNombre: clienteNombre,
      cuenta: precio,
      dias: elementos.dias,
    };

    const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    historialCotizaciones.push(nuevaCotizacion);
    localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));

    setHistorialCotizaciones(historialCotizaciones);
    Swal.fire('Cotización Guardada', 'La cotización se ha guardado con éxito.', 'success');
  };

  useEffect(() => {
    const leerDatos = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al cargar los datos.', 'error');
      }
    };
    leerDatos();
  }, []);

  return (
    <>
      <nav>
        <Link to="/presupuestos" className="historialLink">
          <FaHistory className="historialBoton"  />
        </Link>
      </nav>
      <section className='header'>
      <h1>Cotizador de Seguros</h1>

      </section>
      <form onSubmit={(e) => e.preventDefault()}>
        <Opciones datos={datos.filter((elemento) => elemento.categoria === 'propiedad')} label={'Tipo de Propiedad'} tipo={'proyecto'} />
        <Opciones datos={datos.filter((elemento) => elemento.categoria === 'ubicacion')} label={'Ubicación'} tipo={'cliente'} />
        <label htmlFor="dias" className="formText">
          Cantidad de días:
        </label>
        <input
          type="number"
          id="dias"
          value={elementos.dias}
          onChange={(e) =>
            setElementos({
              ...elementos,
              dias: Math.max(20, parseInt(e.target.value) || 20),
            })
          }
        />
        <button onClick={realizarCotizacion} className="botonCotizar">
          Cotizar
        </button>
      </form>
      {precio > 0 && (
        <section className='precioFinalContainer'>
          <p className="precioFinal">El precio estimado es de ${precio.toFixed(2)}</p>
          <button className="boton-guardar" onClick={guardarCotizacion}>
            <FaFloppyDisk className="icono-guardar" />
          </button>
        </section>
      )}
    </>
  );
};

export default Cotizador;
