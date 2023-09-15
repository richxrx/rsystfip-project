import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  NavigateFunction,
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import rsystfipLogo from '../assets/rsystfip.svg';
import { resetAllFormDataProgramming } from '../features/appointments/appointmentsSlice';
import { AuthState, resetUserAuthenticated } from '../features/auth/authSlice';
import { resetQueryDataReports } from '../features/reports/reportsSlice';
import { resetQueryDataStatistics } from '../features/statistics/statisticsSlice';
import { destroyTemporals } from '../features/temp/tempSlice';
import { resetFormDataAdmin } from '../features/users/usersSlice';
import ProtectedElement from './ProtectedElement';

interface IProps {
  permissions: Array<string>;
}

function NavBar({ permissions }: IProps): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElMenu1, setAnchorElMenu1] = useState<null | HTMLElement>(null);
  const [anchorElMenu2, setAnchorElMenu2] = useState<null | HTMLElement>(null);
  const [anchorElMenu3, setAnchorElMenu3] = useState<null | HTMLElement>(null);

  const handleOpenMenu1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu1(event.currentTarget);
  };
  const handleCloseMenu1 = () => {
    setAnchorElMenu1(null);
  };

  const handleOpenMenu2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu2(event.currentTarget);
  };
  const handleCloseMenu2 = () => {
    setAnchorElMenu2(null);
  };

  const handleOpenMenu3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu3(event.currentTarget);
  };
  const handleCloseMenu3 = () => {
    setAnchorElMenu3(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogout = () => {
    handleCloseUserMenu();
    dispatch(resetUserAuthenticated());
    dispatch(resetFormDataAdmin());
    dispatch(resetQueryDataReports());
    dispatch(resetQueryDataStatistics());
    dispatch(resetAllFormDataProgramming());
    dispatch(destroyTemporals());
    navigate('/signin');
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ mx: 3 }}>
        <Box
          component="img"
          alt="RSystfip logotype"
          src={rsystfipLogo}
          width={40}
          height={32}
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem
              component={RouterLink}
              to="/home"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Home</Typography>
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/users"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Users</Typography>
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/appointments"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Appointments</Typography>
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/reports"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Reports</Typography>
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/faqs"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Faqs</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
            component={RouterLink}
            to="/home"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white' }}
          >
            Inicio
          </Button>

          <ProtectedElement isAllowed={permissions.includes('admin')}>
            <Button
              component={RouterLink}
              to="/users"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white' }}
            >
              Usuarios
            </Button>
          </ProtectedElement>

          <Button
            onClick={handleOpenMenu1}
            sx={{ my: 2, color: 'white' }}
            disableElevation
            endIcon={<KeyboardArrowDownIcon />}
          >
            Agendar
          </Button>

          <Menu
            anchorEl={anchorElMenu1}
            open={Boolean(anchorElMenu1)}
            onClose={handleCloseMenu1}
          >
            <ProtectedElement isAllowed={permissions.includes('add')}>
              <MenuItem
                component={RouterLink}
                to="/people/create"
                onClick={handleCloseMenu1}
              >
                <Typography textAlign="center">Diario</Typography>
              </MenuItem>
            </ProtectedElement>

            <ProtectedElement isAllowed={permissions.includes('schedule')}>
              <MenuItem
                component={RouterLink}
                to="/people/create-schedule"
                onClick={handleCloseMenu1}
              >
                <Typography textAlign="center">Programado</Typography>
              </MenuItem>
            </ProtectedElement>
          </Menu>

          <ProtectedElement isAllowed={permissions.includes('schedule')}>
            <Button
              component={RouterLink}
              to="/appointments"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white' }}
            >
              Agendamientos
            </Button>
          </ProtectedElement>

          <ProtectedElement isAllowed={permissions.includes('statistics')}>
            <Button
              onClick={handleOpenMenu2}
              sx={{ my: 2, color: 'white' }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Estadísticas
            </Button>
          </ProtectedElement>

          <Menu
            anchorEl={anchorElMenu2}
            open={Boolean(anchorElMenu2)}
            onClose={handleCloseMenu2}
          >
            <MenuItem
              component={RouterLink}
              to="/statistics/daily"
              onClick={handleCloseMenu2}
            >
              <Typography textAlign="center">Diario</Typography>
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/statistics/scheduled"
              onClick={handleCloseMenu2}
            >
              <Typography textAlign="center">Programado</Typography>
            </MenuItem>
          </Menu>

          <ProtectedElement isAllowed={permissions.includes('reports')}>
            <Button
              component={RouterLink}
              to="/reports"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white' }}
            >
              Reportes
            </Button>
          </ProtectedElement>

          <Button
            onClick={handleOpenMenu3}
            sx={{ my: 2, color: 'white' }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Historial
          </Button>

          <Menu
            anchorEl={anchorElMenu3}
            open={Boolean(anchorElMenu3)}
            onClose={handleCloseMenu3}
          >
            <MenuItem
              component={RouterLink}
              to="/history/general"
              onClick={handleCloseMenu3}
            >
              <Typography textAlign="center">General</Typography>
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/history/cancelled"
              onClick={handleCloseMenu3}
            >
              <Typography textAlign="center">Cancelamientos</Typography>
            </MenuItem>
          </Menu>

          <Button
            component={RouterLink}
            to="/faqs"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white' }}
          >
            Faqs
          </Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>
                {authState.userAuth.first_name[0]
                  .toUpperCase()
                  .concat(authState.userAuth.last_name[0].toUpperCase())}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              component={RouterLink}
              to="/faqs"
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Ayuda</Typography>
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to={`/users/change-password/${authState.userAuth.id}`}
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Cambiar contraseña</Typography>
            </MenuItem>

            <MenuItem onClick={handleClickLogout}>
              <Typography textAlign="center">Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
