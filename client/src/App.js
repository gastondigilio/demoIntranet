import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
