import React, { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {
  SignInWithPopup,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const initialInput = {
    email: "",
    password: "",
  };

  const [input, setInput] = useState(initialInput);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("LOGUEADO");
      })
      .catch((err) => {
        console.log("ERROR LOGIN ", err);
      });
  };

  return (
    <form
      className="login"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Email
        </span>

        <input
          name="email"
          value={input.email}
          placeholder="email@example.com"
          type="text"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="form-control"
          aria-label="Email"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Password
        </span>

        <input
          name="password"
          value={input.password}
          placeholder="12345"
          type="text"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="form-control"
          aria-label="Password"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={(e) => {
            handleAgregar(e);
          }}
        >
          Agregar
        </button>

        <button className="btn btn-primary" type="submit">
          Aceptar
        </button>
      </div>
    </form>
  );
}
