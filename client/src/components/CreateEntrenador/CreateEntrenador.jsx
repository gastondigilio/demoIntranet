// import React, { useState, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   setLoading,
//   setUid,
//   setUserType,
//   getEntrenadores,
// } from "../../redux/actions/actions";

// import emailjs from "@emailjs/browser";

// import "./CreateEntrenador.css";

// import Spinner from "../Spinner/Spinner";
// import { UID_PRESIDENTE, ENTRENADORES, PRESIDENTE } from "../../config";
// import ErrorPermisos from "../ErrorPermisos/ErrorPermisos";

// const CreateEntrenador = () => {
//   const dispatch = useDispatch();
//   const initialInput = {
//     nombre: "",
//     email: "",
//   };

//   const [input, setInput] = useState(initialInput);
//   const [entrenadoresAgregados, setEntrenadoresAgregados] = useState([]);
//   const isLoading = useSelector((state) => state.isLoading);
//   const entrenadores = useSelector((state) => state.entrenadores);
//   const userType = useSelector((state) => state.userType);
//   const uid = useSelector((state) => state.uid);

//   const handleInputChange = (e) => {
//     e.preventDefault();
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleAgregar = (e) => {
//     e.preventDefault();
//     setEntrenadoresAgregados([...entrenadoresAgregados, input]);
//     setInput(initialInput);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setLoading(true));

//     emailjs.init("A_EZ040hD2lkySGIj");

//     entrenadoresAgregados.map((entrenador) => {
//       emailjs.send("service_0kg3rpc", "template_rjblcxj", {
//         from_name: "CallStack IT",
//         to_name: entrenador.nombre,
//         to_email: entrenador.email,
//       });
//     });

//     dispatch(setLoading(false));
//     setEntrenadoresAgregados([]);
//   };

//   const handleValidateAgregar = () => {
//     let regexEmail =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     if (
//       !validateRepeat() &&
//       regexEmail.test(input.email) &&
//       input.nombre.length > 2
//     ) {
//       return false;
//     } else {
//       return true;
//     }
//   };

//   const handleValidateAceptar = () => {
//     return entrenadoresAgregados.length < 1;
//   };

//   const validateRepeat = () => {
//     for (let i = 0; i < entrenadoresAgregados.length; i++) {
//       if (entrenadoresAgregados[i].email === input.email) {
//         return true;
//       }
//     }
//     return false;
//   };

//   useEffect(() => {
//     dispatch(getEntrenadores());
//     dispatch(setLoading(true));
//     dispatch(setUid(true));
//     setTimeout(() => {
//       dispatch(setLoading(false));
//     }, 1500);
//   }, []);

//   useEffect(() => {
//     if (uid) dispatch(setUserType(uid, entrenadores.data, []));
//   }, [entrenadores, uid]);

//   return (
//     <>
//       {isLoading ? (
//         <Spinner />
//       ) : userType === PRESIDENTE || userType === ENTRENADORES ? (
//         <div className="create-entrenador">
//           <h2 className="sub-title">Dar de alta entrenadores</h2>

//           <form
//             onSubmit={(e) => {
//               handleSubmit(e);
//             }}
//           >
//             <div className="input-group flex-nowrap">
//               <span className="input-group-text" id="addon-wrapping">
//                 Nombre
//               </span>

//               <input
//                 name="nombre"
//                 value={input.nombre}
//                 placeholder="Juan Pérez"
//                 type="text"
//                 onChange={(e) => {
//                   handleInputChange(e);
//                 }}
//                 className="form-control"
//                 aria-label="Username"
//                 aria-describedby="addon-wrapping"
//               />
//             </div>

//             <div className="input-group flex-nowrap">
//               <span className="input-group-text" id="addon-wrapping">
//                 Email
//               </span>

//               <input
//                 name="email"
//                 value={input.email}
//                 placeholder="juanperez@example.com"
//                 type="text"
//                 onChange={(e) => {
//                   handleInputChange(e);
//                 }}
//                 className="form-control"
//                 aria-label="Email"
//                 aria-describedby="addon-wrapping"
//               />
//             </div>

//             <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//               <button
//                 className="btn btn-primary me-md-2"
//                 type="button"
//                 onClick={(e) => {
//                   handleAgregar(e);
//                 }}
//                 disabled={handleValidateAgregar()}
//               >
//                 Agregar
//               </button>

//               <button
//                 className="btn btn-primary"
//                 type="submit"
//                 disabled={handleValidateAceptar()}
//               >
//                 Aceptar
//               </button>
//             </div>
//           </form>

//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th style={{ width: "50%", textAlign: "center" }} scope="col">
//                   Nombre
//                 </th>
//                 <th style={{ width: "50%", textAlign: "center" }} scope="col">
//                   Email
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {!entrenadoresAgregados.length && (
//                 <tr>
//                   <td
//                     className="example-text"
//                     style={{ textAlign: "center", fontSize: "12px" }}
//                   >
//                     Juan Pérez
//                   </td>
//                   <td
//                     className="example-text"
//                     style={{ textAlign: "center", fontSize: "12px" }}
//                   >
//                     juanperez@example.com
//                   </td>
//                 </tr>
//               )}
//               {entrenadoresAgregados.length
//                 ? entrenadoresAgregados.map((entrenador) => {
//                     return (
//                       <tr key={entrenador.email}>
//                         <td className="table-data">{entrenador.nombre}</td>
//                         <td className="table-data">{entrenador.email}</td>
//                       </tr>
//                     );
//                   })
//                 : null}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <ErrorPermisos />
//       )}
//     </>
//   );
// };

// export default CreateEntrenador;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntrenador } from "../../redux/actions/actions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Demo Intranet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function CreateEntrenador() {
  const dispatch = useDispatch();
  const theme = createTheme();
  const initialValues = {
    name: "",
    email: "",
    asignarEquipo: "",
  };

  const [input, setInput] = useState(initialValues);
  const error = useSelector((state) => state.error);
  const uids = useSelector((state) => state.uids);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createEntrenador(input));
    setTimeout(() => {
      window.location.pathname = "/";
    }, 1500);
  };

  const registerVerify = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const verify =
      input.name.length > 2 &&
      emailRegex.test(input.email) &&
      input.email === input.cemail &&
      passwordRegex.test(input.password) &&
      input.password === input.cpassword;

    return !verify;
  };

  useEffect(() => {
    console.log("ERROR: ", error);
    console.log("uids: ", uids);
  }, [error, uids]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear entrenador
            </Typography>
            <Box
              component="form"
              sx={{ mt: 3 }}
              onSubmit={(e) => handleRegister(e)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre completo"
                    autoFocus
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    Asignar equipo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="asignar equipo"
                    name="asignarEquipo"
                    fullWidth
                    required
                  >
                    <MenuItem value={10}>Juvenil A</MenuItem>
                    <MenuItem value={20}>Juvenil B</MenuItem>
                    <MenuItem value={30}>Inferiores</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={registerVerify()}
              >
                Crear
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="btnRegister">Volver al home</div>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
