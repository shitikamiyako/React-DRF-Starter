import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DrawerList from "./DrawerList";
import AuthAccountCircle from "./AuthAccountCircle";
import NoAuthAccountCircle from "./AuthAccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  }
}));

const MenuAppBar = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };


  return (
    <React.Fragment>
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={state.left}
              onClick={toggleDrawer('left', false)}
              onKeyDown={toggleDrawer('left', false)}
            >
              <DrawerList Styles={classes.list}/>
            </SwipeableDrawer>
            <Typography variant="h6" className={classes.title}>
              Sample App
            </Typography>
            {!auth && (
              <NoAuthAccountCircle />
            )}
            {auth && (
              <AuthAccountCircle  />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default MenuAppBar