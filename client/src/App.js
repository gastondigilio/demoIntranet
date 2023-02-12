import React from "react";
import { Routes, Route } from "react-router-dom";

import { REGISTER_ENTRENADOR, REGISTER_JUGADOR } from "./config";

import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import RegisterJugador from "./components/RegisterJugador/RegisterJugador";
import RegisterEntrenador from "./components/RegisterEntrenador/RegisterEntrenador";
import HomePresidente from "./pages/PanelPresidente/HomePresidente/HomePresidente";
import HomeJugadores from "./pages/PanelJugadores/HomeJugadores/HomeJugadores";
import HomeEntrenadores from "./pages/PanelEntrenador/HomeEntrenadores/HomeEntrenadores";
import PerfilEntrenador from "./pages/PanelEntrenador/PerfilEntrenador/PerfilEntrenador";
import CreateEntrenador from "./components/CreateEntrenador/CreateEntrenador";
import CreateJugador from "./components/CreateJugador/CreateJugador";
import CreateEquipo from "./components/CreateEquipo/CreateEquipo";

import "./App.css";
import EquipoDetail from "./components/EquipoDetail/EquipoDetail";
import EntrenadorDetail from "./components/EntrenadorDetail/EntrenadorDetail";

const App = () => {
  return (
    <div className="app">
      <Routes>
        {/* RUTAS GENERALES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/" + REGISTER_JUGADOR} element={<RegisterJugador />} />
        <Route
          path={"/" + REGISTER_ENTRENADOR}
          element={<RegisterEntrenador />}
        />

        {/* RUTAS DE CREACION */}
        <Route path="crear-entrenador" element={<CreateEntrenador />} />
        <Route path="crear-jugador" element={<CreateJugador />} />
        <Route path="crear-equipo" element={<CreateEquipo />} />

        {/* RUTAS DE DETALLES */}
        <Route path="equipo/:nombre" element={<EquipoDetail />} />
        <Route path="entrenador/:email" element={<EntrenadorDetail />} />

        {/* RUTAS ENTRENADORES */}
      </Routes>
    </div>
  );
};

export default App;
