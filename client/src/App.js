import React from "react";
import { Routes, Route } from "react-router-dom";

import { REGISTER_ENTRENADOR, REGISTER_JUGADOR } from "./config";

import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import RegisterJugador from "./components/RegisterJugador/RegisterJugador";
import RegisterEntrenador from "./components/RegisterEntrenador/RegisterEntrenador";
import HomePresidente from "./pages/PanelPresidente/HomePresidente/HomePresidente";
import CreateEntrenadorPanel from "./pages/PanelPresidente/CreateEntrenadorPanel/CreateEntrenadorPanel";
import CreateEquipoPanel from "./pages/PanelPresidente/CreateEquipoPanel/CreateEquipoPanel";

import HomeJugadores from "./pages/PanelJugadores/HomeJugadores/HomeJugadores";

import HomeEntrenadores from "./pages/PanelEntrenador/HomeEntrenadores/HomeEntrenadores";
import CrearJugador from "./pages/PanelEntrenador/CrearJugador/CrearJugador";
import PerfilEntrenador from "./pages/PanelEntrenador/PerfilEntrenador/PerfilEntrenador";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/home-presidente" element={<HomePresidente />} />
        <Route
          path="/home-presidente/crear-entrenador"
          element={<CreateEntrenadorPanel />}
        />
        <Route
          path="/home-presidente/crear-equipo"
          element={<CreateEquipoPanel />}
        />
        <Route path="/home-jugadores" element={<HomeJugadores />} />

        <Route path="/home-entrenadores" element={<HomeEntrenadores />} />
        <Route
          path="/home-entrenadores/crear-jugador"
          element={<CrearJugador />}
        />
        <Route
          path="/home-entrenadores/perfil"
          element={<PerfilEntrenador />}
        />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/" + REGISTER_JUGADOR} element={<RegisterJugador />} />
        <Route path={"/" + REGISTER_ENTRENADOR} element={<RegisterEntrenador />} />
      </Routes>
    </div>
  );
};

export default App;
