import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@mui/material/Link';
import Logout from "../../components/Logout/Logout";


export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                {/* <DashboardIcon /> */}
            </ListItemIcon>
            <Logout/>
            <br/>
            <h5>Es Entrenador</h5>
            {/* <Link href='/home-presidente/crear-entrenador' target="_self"> */}
            {/* <ListItemText primary="Nombre del club" /> */}
            {/* </Link> */}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                {/* <DashboardIcon /> */}
            </ListItemIcon>
            <Link href='/home-presidente/crear-entrenador' target="_self">
            <ListItemText primary="Nombre del club" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                {/* <ShoppingCartIcon /> */}
            </ListItemIcon>
            <Link href='/home-presidente/crear-equipo' target="_self">
            <ListItemText primary="Equipos" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                {/* <ShoppingCartIcon /> */}
            </ListItemIcon>
            <Link href='/home-entrenadores/perfil' target="_self">
            <ListItemText primary="Perfil" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                {/* <ShoppingCartIcon /> */}
            </ListItemIcon>
            <Link href='/home-presidente/crear-equipo' target="_self">
            <ListItemText primary="Chat de grupo" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                {/* <ShoppingCartIcon /> */}
            </ListItemIcon>
            <Link href='/home-entrenadores/crear-jugador' target="_self">
            <ListItemText primary="Crear jugador" />
            </Link>
        </ListItem>
        {/* <ListItem button>
    asd
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
    </div>
);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>  */}
    </div>
);