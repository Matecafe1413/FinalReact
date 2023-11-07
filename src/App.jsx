import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cotizador from "./components/Cotizador";
import Presupuestos from "./components/Presupuestos";
import PresupuestosContext from "./context/PresupuestosContext";
import CotizadorContext from "./context/CotizadorContext";
import {HistorialContext} from "./context/HistorialContext";
import React, { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [elementos, setElementos] = useState({ dias: 30, proyecto: 0, cliente: 0 });
  const [presupuestos, setPresupuestos] = useLocalStorage("presupuestos", []);
  const [historialCotizaciones, setHistorialCotizaciones] = useLocalStorage("historialCotizaciones", []); // Agrega el historial

  return (
    <>
      <PresupuestosContext.Provider value={{ presupuestos, setPresupuestos }}>
        <CotizadorContext.Provider value={{ elementos, setElementos }}>
          <HistorialContext.Provider value={{ historialCotizaciones, setHistorialCotizaciones }}> {/* Configura el contexto de HistorialContext */}
            <BrowserRouter>
              <Routes>
                <Route path="/" index element={<Cotizador />} />
                <Route path="/presupuestos" element={<Presupuestos />}/>
              </Routes>
            </BrowserRouter>
          </HistorialContext.Provider>
        </CotizadorContext.Provider>
      </PresupuestosContext.Provider>
    </>
  );
};

export default App;
