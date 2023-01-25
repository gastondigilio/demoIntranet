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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/" + REGISTER_JUGADOR} element={<RegisterJugador />} />
        <Route path={"/" + REGISTER_ENTRENADOR} element={<RegisterEntrenador />} />
      </Routes>
    </div>
  );
};

export default App;
