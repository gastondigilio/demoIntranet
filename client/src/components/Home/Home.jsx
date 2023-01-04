import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntrenadores } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

import "./Home.css";
import CreateEntrenador from "../CreateEntrenador/CreateEntrenador";
import ListadoEntrenadores from "../ListadoEntrenadores/ListadoEntrenadores";

const Home = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);

  const handleRefresh = () => {
    dispatch(getEntrenadores());

    if (entrenadores && entrenadores.data) {
      console.log(entrenadores.data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getEntrenadores());
    }, 1000);
  }, []);

  return (
    <div className="home">
      <CreateEntrenador />
      <ListadoEntrenadores />
      <button
        className="btn btn-primary"
        onClick={() => {
          handleRefresh();
        }}
      >
        Refresh and log
      </button>
    </div>
  );
};

export default Home;
