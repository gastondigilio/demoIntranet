import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import HomePresidente from "./components/PanelPresidente/HomePresidente/HomePresidente";
import CreateEntrenadorPanel from "./components/PanelPresidente/CreateEntrenadorPanel/CreateEntrenadorPanel";
import CreateEquipoPanel from "./components/PanelPresidente/CreateEquipoPanel/CreateEquipoPanel";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/home-presidente" element={<HomePresidente />} />
        <Route path="/home-presidente/crear-entrenador" element={<CreateEntrenadorPanel />} />
        <Route path="/home-presidente/crear-equipo" element={<CreateEquipoPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
