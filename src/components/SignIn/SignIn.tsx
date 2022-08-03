import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import './SignIn.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  ThemeProvider,
  createTheme,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
} from '@mui/material';

import { logIn } from '../../api';
import Logo from '../Logo/Logo';

export function SignIn() {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlerForm = async () => {
    if (password && userName) {
      const response = await logIn(userName, password);

      // eslint-disable-next-line no-console
      console.log(response);

      if (!response.ok) {
        setError('The username or password is invalid');
      //  throw new Error(`${response.status} - ${response.statusText}`);
      } else {
        setPassword('');
        setUserName('');
        navigate('/home', { replace: true });
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            marginBottom: '35px',
          },
        },
      },
    },
  });

  return (
    <>
      <section className="signin">
        <Logo />
        <p className="signin__title">SIGN IN</p>
        <ThemeProvider theme={theme}>
          <FormControl onSubmit={handlerForm} className="signin__form">
            <FormControl>
              <TextField
                label="User Name"
                variant="standard"
                color="primary"
                placeholder="Example123"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </FormControl>

            <FormControl>
              <InputLabel sx={{ left: '-13px' }} htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ padding: '0' }}
                      aria-label="toggle password visibility"
                      onClick={() => {
                        (
                          setIsPasswordVisible(!isPasswordVisible)
                        );
                      }}
                    >
                      {!isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </FormControl>

            <button
              type="button"
              className="signin__button"
              onClick={() => {
                handlerForm();
              }}
            >
              <span className="signin__buttonname">Sign In</span>
            </button>
            <p className="signin__undernotice signin__undernotice--in">
              Don&apos;t have account yet?
              {' '}
              <NavLink to="/auth/register" className="signin__newaccount">New Account</NavLink>
            </p>
          </FormControl>
          {error.length ? (
            <span className="signin__error">
              {error}
            </span>
          ) : ''}
        </ThemeProvider>
      </section>
    </>
  );
}
