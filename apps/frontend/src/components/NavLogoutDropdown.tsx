import { Dropdown, Image } from 'react-bootstrap';
import { BiLogOutCircle } from 'react-icons/bi';
import { NavLink, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetAllFormDataProgramming } from '../features/appointments/appointmentsSlice';
import { AuthState, resetUserAuthenticated } from '../features/auth/authSlice';
import { resetQueryDataReports } from '../features/reports/reportsSlice';
import { resetQueryDataStatistics } from '../features/statistics/statisticsSlice';
import { destroyTemporals } from '../features/temp/tempSlice';
import { resetFormDataAdmin } from '../features/users/usersSlice';

interface IProps {
  avatar: string;
}

function NavLogoutDropdown({ avatar }: IProps): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const handleClick = () => {
    dispatch(resetUserAuthenticated());
    dispatch(resetFormDataAdmin());
    dispatch(resetQueryDataReports());
    dispatch(resetQueryDataStatistics());
    dispatch(resetAllFormDataProgramming());
    dispatch(destroyTemporals());
    navigate('/signin');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="a"
        className="d-flex align-items-center mt-3 mt-lg-0 mb-2 mb-lg-0 link-dark text-decoration-none me-3"
      >
        <Image src={avatar} roundedCircle width="40" alt="Account" />
      </Dropdown.Toggle>

      <Dropdown.Menu
        align={{ lg: 'end' }}
        className="border-0 shadow-sm rounded-3 bg-white"
      >
        <NavLink to="/faqs" className="dropdown-item">
          FAQs
        </NavLink>
        <NavLink
          to={`/users/change-password/${authState.userAuth.id}`}
          className="dropdown-item"
        >
          Cambiar contraseña
        </NavLink>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleClick}>
          Cerrar sesión <BiLogOutCircle />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavLogoutDropdown;
