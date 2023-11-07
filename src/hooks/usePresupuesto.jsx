import { useContext } from "react";
import PresupuestosContext from "../context/PresupuestosContext";

const usePresupuesto = () => {
  return useContext(PresupuestosContext);
};

export default usePresupuesto;
