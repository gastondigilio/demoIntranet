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

        {/* RUTAS HOME */}
        <Route path="/home-jugadores" element={<HomeJugadores />} />
        <Route path="/home-presidente" element={<HomePresidente />} />
        <Route path="/home-entrenadores" element={<HomeEntrenadores />} />

        {/* RUTAS PRESIDENTE */}
        <Route
          path="/home-presidente/crear-entrenador"
          element={<CreateEntrenador />}
        />
        <Route
          path="/home-entrenadores/crear-jugador"
          element={<CreateJugador />}
        />
        <Route
          path="/home-presidente/crear-equipo"
          element={<CreateEquipo />}
        />

        {/* RUTAS ENTRENADORES */}
        <Route
          path="/home-entrenadores/crear-jugador"
          element={<CreateJugador />}
        />
        <Route
          path="/home-entrenadores/perfil"
          element={<PerfilEntrenador />}
        />
      </Routes>
    </div>
  );
};

export default App;
