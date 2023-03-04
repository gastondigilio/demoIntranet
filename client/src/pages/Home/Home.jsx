import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getJugadores,
  setUserType,
  setUid,
  setLoading,
} from "../../redux/actions/actions";

import "./Home.css";
import Icon from "../../images/IconoMadrid.png";
import FutFem from "../../images/futfem.jpg";

import HomeJugadores from "../PanelJugadores/HomeJugadores/HomeJugadores";
import HomePresidente from "../PanelPresidente/HomePresidente/HomePresidente";
import Spinner from "../../components/Spinner/Spinner";

import { JUGADORES, ENTRENADORES, PRESIDENTE } from "../../config";
import HomeEntrenadores from "../PanelEntrenador/HomeEntrenadores/HomeEntrenadores";

const Home = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const userType = useSelector((state) => state.userType);
  const uid = useSelector((state) => state.uid);

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
    dispatch(getEntrenadores());
    dispatch(getJugadores());
    dispatch(setUid(true));
  }, []);

  useEffect(() => {
    if (uid) dispatch(setUserType(uid, entrenadores.data, jugadores.data));
  }, [jugadores, entrenadores, uid]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="home">
          {!uid ? (
            <div className="homeLanding">
              <nav>
                <div>
                  <img src={Icon} />
                  <p>Real Madrid FC</p>
                </div>
                <a href="/login" className="btn btn-primary btn-sm">
                  Ingresar
                </a>
              </nav>
              <article>
                <div className="card">
                  <p className="card-header">¿No tienes usuario?</p>
                  <div className="card-body">
                    <p>
                      <span>
                        Para ingresar con tu cuenta debes contactarte con el
                        presidente del club o con tu entrenador para que pueda
                        dar de alta tu usuario.
                      </span>
                      <br />
                      <br />
                      Si ya tienes usuario, ¡solo debes tocar el boton de
                      Ingresar!
                      <br />
                      <br />
                    </p>
                    <a
                      href="/login"
                      className="btn btn-primary btn-sm"
                      style={{ alignSelf: "flex-end" }}
                    >
                      Ingresar
                    </a>
                  </div>
                </div>
                <div className="card">
                  <p className="card-header">Información útil</p>
                  <div className="card-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto ut, blanditiis optio nihil aspernatur natus
                      reiciendis facilis, est temporibus quasi, quos quas
                      dolorem ullam enim eum?
                      <br />
                      <br />
                      Sapiente assumenda quasi tempore voluptatum omnis
                      necessitatibus, enim nihil ducimus temporibus explicabo
                      nulla accusantium alias, eius blanditiis placeat harum
                      doloremque maiores dicta aut consectetur ex ut asperiores!
                      nulla accusantium alias, eius blanditiis placeat harum
                      doloremque maiores dicta aut consectetur ex ut asperiores!
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div>
              {userType === JUGADORES && <HomeJugadores />}
              {userType === ENTRENADORES && <HomeEntrenadores />}
              {userType === PRESIDENTE && <HomePresidente />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
