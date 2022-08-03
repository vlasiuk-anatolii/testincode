// import { useNavigate } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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
import { registerUser } from '../../api';
import Logo from '../Logo/Logo';
import './SignUp.scss';

export function SignUp() {
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlerForm = async () => {
    if (password && username && displayName) {
      if (!(/[\w\D]{8,}/g).test(password)) {
        setError(true);
      } else {
        setError(false);
      }

      const response = await registerUser(password, username, displayName);

      // eslint-disable-next-line no-console
      console.log(response);

      if (!response.ok) {
        if (response.status === 409) {
          setIsUserNameExist(true);
        }
        // throw new Error(`${response.status} - ${response.statusText}`);
      } else {
        setIsUserNameExist(false);
        setPassword('');
        setUserName('');
        setDisplayName('');
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
      <section className="signup">
        <Logo />
        <p className="signup__title">SIGN UP</p>
        <ThemeProvider theme={theme}>
          <FormControl className="signup__form">

            <TextField
              label={isUserNameExist ? 'Username is already exist' : 'User Name'}
              variant="standard"
              color="primary"
              placeholder="Example Name"
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />

            <TextField
              label="Display Name"
              variant="standard"
              color="primary"
              placeholder="Example123"
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
              }}
            />

            <FormControl>
              <InputLabel sx={{ left: '-13px' }} htmlFor="standard-adornment-password">
                <span>
                  {error ? 'Wrong password' : 'Password'}
                </span>
              </InputLabel>
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
              className="signup__button"
              onClick={() => {
                handlerForm();
              }}
            >
              <span className="signup__buttonname">Sign Up</span>
            </button>
            <p className="signup__undernotice signup__undernotice--up">
              I have an account.
              {' '}
              <NavLink to="/auth/login" className="signup__newaccount">Go to Sign in</NavLink>
            </p>
          </FormControl>
        </ThemeProvider>
      </section>
    </>
  );
}
