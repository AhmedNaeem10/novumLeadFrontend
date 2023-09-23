import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { Button, Divider } from '@mui/material';
import store from '../store';
import { ROUTE_CONSTANTS } from '../constants/RouteConstants';
import { adminLogout } from '../store/actions';
import logo from '../assets/images/logo.png';

const items = [
  {
    icon: <MessageIcon />,
    label: "Appointments",
    route: ROUTE_CONSTANTS.DASHBOARD,
  },
  {
    icon: <ManageSearchIcon />,
    label: "Inspection Bookings",
    route: ROUTE_CONSTANTS.BOOKINGS,
  },
  {
    icon: <ImagesearchRollerIcon />,
    label: "Projects",
    route: ROUTE_CONSTANTS.PROJECTS,
  },
  {
    icon: <SupervisorAccountIcon />,
    label: "Accounts",
    route: ROUTE_CONSTANTS.ACCOUNTS,
  },
  {
    icon: <PeopleOutlineIcon />,
    label: "Users",
    route: ROUTE_CONSTANTS.USERS,
  },
]

const logout_ = {
  icon: <LogoutIcon />,
  label: "Logout",
}



function DrawerNavigation({ open, toggleDrawer, logo }) {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  }

  const logout = () => {
    store.dispatch(adminLogout());
    navigate(ROUTE_CONSTANTS.BASE)
  }

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Box
        component="img"
        sx={{ width: 150, marginTop: 5, marginLeft: 9, cursor: "pointer", alignSelf: 'center' }}
        alt="Logo"
        src={logo}
        onClick={() => { navigate(ROUTE_CONSTANTS.DASHBOARD) }}
      />
      <List>
        {
          items.map((obj, index) => {
            return (
              obj.divider ? obj.component :
                <ListItem key={obj.label} disablePadding onClick={() => { handleClick(obj.route) }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {obj.icon}
                    </ListItemIcon>
                    <ListItemText primary={obj.label} />
                  </ListItemButton>
                </ListItem>
            );
          })
        }
        <Divider />
        <ListItem disablePadding onClick={() => { logout() }}>
          <ListItemButton>
            <ListItemIcon>
              {logout_.icon}
            </ListItemIcon>
            <ListItemText primary={logout_.label} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          color="secondary"
          open={open}
          onClose={toggleDrawer}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default DrawerNavigation;
