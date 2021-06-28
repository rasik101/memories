import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import Input from "./Input";
import { LockOutlined } from "@material-ui/icons";
import GoogleLogin from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, login } from '../../actions/auth';
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (isSignup) {
      dispatch(signup(values,history));
    }
    else {
      dispatch(login(values,history));
   }
  };
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleSignIn = () => {
    setSignup((prev) => !prev);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log("failure", err);
  };
  const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                  value={values.firstName}
                />

                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                  value={values.lastName}
                />
              </>
            )}
            <Input
              name='email'
              label='Email'
              handleChange={handleChange}
              type='email'
              value={values.email}
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              value={values.password}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                value={values.confirmPassword}
                type='password'
              />
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId='845524275664-3f7d75r0n79ep5g86biu54t2toafcep2.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  fullWidth
                  variant='contained'
                  startIcon={<Icon />}
                >
                  Google Sign in
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
              fullWidth
            />
          </Grid>
          <Grid container justify='center'>
            <Grid item>
              <Button onClick={handleSignIn}>
                {isSignup ? "Already have a account" : "Don't have a account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
