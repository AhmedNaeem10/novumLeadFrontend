import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material';
import store from '../store';
import { ROUTE_CONSTANTS } from '../constants/RouteConstants';
import { adminLogout } from '../store/actions';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const items = [
  {
    icon: <MessageIcon />,
    label: "Bookings",
    route: ROUTE_CONSTANTS.BOOKINGS,
  },
  {
    icon: <ImagesearchRollerIcon />,
    label: "Projects",
    route: ROUTE_CONSTANTS.PROJECTS,
  },
  {
    icon: <AnalyticsIcon />,
    label: "Analytics",
    route: ROUTE_CONSTANTS.ANALYTICS,
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

  const { name } = useSelector(store => store)

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
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
        <Typography sx={{ marginLeft: 3, fontSize: 18 }}>{`Welcome `}</Typography><Typography sx={{ color: '#148CD0', fontWeight: "bold", ml: 1, fontSize: 18, }}>{`${name}`}</Typography>
      </div>
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
