import React, { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import pelota from '../images/pelota.jpg';
import './Login.css'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Demo Intranet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  // const initialInput = {
  //   email: "",
  //   password: "",
  // };

  // const [input, setInput] = useState(initialInput);

  // const handleInputChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  // const handleAgregar = () => {};

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const googleProvider = new GoogleAuthProvider();
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {
  //       console.log("LOGUEADO");
  //     })
  //     .catch((err) => {
  //       console.log("ERROR LOGIN ", err);
  //     });
  // };

  return (
    // <form
    //   className="login"
    //   onSubmit={(e) => {
    //     handleSubmit(e);
    //   }}
    // >
    //   <div className="input-group flex-nowrap">
    //     <span className="input-group-text" id="addon-wrapping">
    //       Email
    //     </span>

    //     <input
    //       name="email"
    //       value={input.email}
    //       placeholder="email@example.com"
    //       type="text"
    //       onChange={(e) => {
    //         handleInputChange(e);
    //       }}
    //       className="form-control"
    //       aria-label="Email"
    //       aria-describedby="addon-wrapping"
    //     />
    //   </div>

    //   <div className="input-group flex-nowrap">
    //     <span className="input-group-text" id="addon-wrapping">
    //       Password
    //     </span>

    //     <input
    //       name="password"
    //       value={input.password}
    //       placeholder="12345"
    //       type="text"
    //       onChange={(e) => {
    //         handleInputChange(e);
    //       }}
    //       className="form-control"
    //       aria-label="Password"
    //       aria-describedby="addon-wrapping"
    //     />
    //   </div>

    //   <div className="d-grid gap-2 d-md-flex justify-content-md-end">
    //     <button
    //       className="btn btn-primary me-md-2"
    //       type="button"
    //       onClick={(e) => {
    //         handleAgregar(e);
    //       }}
    //     >
    //       Agregar
    //     </button>

    //     <button className="btn btn-primary" type="submit">
    //       Aceptar
    //     </button>
    //   </div>
    // </form>
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${pelota})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1 }}>
                {/* <LockOutlinedIcon /> */}
                <img src={pelota} alt='Imagen de avatar' />
              </Avatar>
              <Typography component="h1" variant="h5">
                Demo Intranet
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  // autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="pass"
                  label="Contraseña"
                  type="password"
                  id="pass"
                  // onChange={handleInputChange}
                  // autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Mantener sesión iniciada"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesion
                </Button>
                {/* {
                  islogin ? < LoadingUser status={islogin} key={input.email} setIslogin={setIslogin} /> : ''
                } */}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" style={{ textDecoration: 'none' }}>
                      <div className="btnLogIn">
                        Se olvidó la contraseña?
                      </div>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2" style={{ textDecoration: 'none' }}>
                      <div className="btnLogIn">
                        {"Registrarse"}
                      </div>
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Link href="/">
        <button className='botonVolverLogin'>
          Volver
        </button>
      </Link>
    </div>
  );
}
