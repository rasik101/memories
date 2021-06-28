import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import Memories from "../../images/memories.png";
import { useLocation ,useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
export const NavBar = () => {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handelLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push('/')
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp*1000 < new Date().getTime()) {
        handelLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography variant='h2' align='center' className={classes.heading}>
          Memories
        </Typography>
        <img
          height='60 '
          alt='memories'
          src={Memories}
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName} varient='h6'>
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              varient='contained'
              color='secondary'
              onClick={handelLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
