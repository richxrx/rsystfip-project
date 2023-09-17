import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import {
  NavigateFunction,
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import photoEntryItfip1 from '../assets/PHOTO-ENTRY-ITFIP-1.jpg';
import rsystfipLogo from '../assets/rsystfip.svg';
import Copyright from '../components/Copyright';
import { AUTH_KEY } from '../constants';
import { AuthState, setAuthenticatedUser } from '../features/auth/authSlice';
import { notify } from '../libs/notify';
import * as authService from '../services/auth.service';
import { THandleChangeI } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';

function PageSignin(): React.ReactNode {
  const formDataInitialState = {
    username: '',
    password: '',
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(authService.auth, {
    onSuccess({ data, headers }) {
      const sessionToSave: AuthState = {
        ...data,
        token: headers.authorization,
      };

      window.localStorage.setItem(AUTH_KEY, JSON.stringify(sessionToSave));
      dispatch(setAuthenticatedUser(sessionToSave));
      navigate('/home');
    },
    onError(error: any) {
      notify(error.response.data.error, { type: 'error' });
    },
  });

  const handleClickTogglePassword = () => {
    setFormData({
      ...formData,
      passwordVisible: !formData.passwordVisible,
    });
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    mutate(payload);
  };

  return (
    <>
      <Helmet>
        <title>RSystfip | Sign in</title>
      </Helmet>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${photoEntryItfip1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ px: 3 }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              alt="RSystfip logotype"
              src={rsystfipLogo}
              width={40}
              height={32}
              sx={{ m: 1 }}
            />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Typography component="h1" variant="subtitle1" align="center">
              Agendamiento visitas Rectoría - ITFIP
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                onChange={handleChange}
                value={formData.username}
                autoComplete="off"
                spellCheck={false}
                inputProps={{ minLength: 5, maxLength: 30 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>@itfip.edu.co</Typography>
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={formData.passwordVisible ? 'text' : 'password'}
                onChange={handleChange}
                value={formData.password}
                autoComplete="off"
                spellCheck={false}
                inputProps={{ minLength: 8, maxLength: 30 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickTogglePassword}>
                        {formData.passwordVisible ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox name="remember" color="primary" />}
                label="Remember me"
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                Sign In
              </LoadingButton>

              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/recover-password"
                    variant="body2"
                  >
                    {'Forgot password?'}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PageSignin;
