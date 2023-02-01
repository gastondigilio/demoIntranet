import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Logout from "../../components/Logout/Logout";

export const mainListItems = (
  <div>
    <ListItem button>
      <Link href="/crear-entrenador" target="_self">
        <ListItemText primary="Nombre del club" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/crear-equipo" target="_self">
        <ListItemText primary="Equipos" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/home-entrenadores/perfil" target="_self">
        <ListItemText primary="Perfil" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/crear-equipo" target="_self">
        <ListItemText primary="Chat de grupo" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/home-entrenadores/crear-jugador" target="_self">
        <ListItemText primary="Crear jugador" />
      </Link>
    </ListItem>
    <ListItem button>
      <Logout />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);
