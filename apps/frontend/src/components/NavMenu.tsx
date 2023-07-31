import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavLogoutDropdown from './NavLogoutDropdown';
import ProtectedElement from './ProtectedElement';

interface IProps {
  avatar: string;
  permissions: Array<string>;
}

function NavMenu({ avatar, permissions }: IProps): React.ReactNode {
  return (
    <Navbar.Collapse id="rs-nav">
      <Nav className="me-auto">
        <Nav.Item>
          <NavLink to="/home/welcome" className="nav-link">
            Inicio
          </NavLink>
        </Nav.Item>
        <ProtectedElement isAllowed={permissions.includes('admin')}>
          <Nav.Item>
            <NavLink to="/users/manage" className="nav-link">
              Usuarios
            </NavLink>
          </Nav.Item>
        </ProtectedElement>
        <NavDropdown title="Agendar">
          <ProtectedElement isAllowed={permissions.includes('add')}>
            <NavLink to="/people/add" className="dropdown-item">
              Diario
            </NavLink>
          </ProtectedElement>

          <ProtectedElement isAllowed={permissions.includes('schedule')}>
            <NavLink to="/people/schedule" className="dropdown-item">
              Programado
            </NavLink>
          </ProtectedElement>
        </NavDropdown>
        <ProtectedElement isAllowed={permissions.includes('schedule')}>
          <Nav.Item>
            <NavLink to="/people/preview" className="nav-link">
              Agendamientos
            </NavLink>
          </Nav.Item>
        </ProtectedElement>
        <ProtectedElement isAllowed={permissions.includes('statistics')}>
          <NavDropdown title="Estadísticas">
            <NavLink to="/people/statistics/daily" className="dropdown-item">
              Diario
            </NavLink>

            <NavLink
              to="/people/statistics/scheduled"
              className="dropdown-item"
            >
              Programado
            </NavLink>
          </NavDropdown>
        </ProtectedElement>

        <ProtectedElement isAllowed={permissions.includes('reports')}>
          <Nav.Item>
            <NavLink to="/people/reports" className="nav-link">
              Reportes
            </NavLink>
          </Nav.Item>
        </ProtectedElement>

        <NavDropdown title="Historial">
          <NavLink to="/people/view" className="dropdown-item">
            General
          </NavLink>

          <NavLink to="/people/cancelled" className="dropdown-item">
            Cancelamientos
          </NavLink>
        </NavDropdown>

        <Nav.Item>
          <NavLink to="/help/asks/frecuently" className="nav-link">
            FAQs
          </NavLink>
        </Nav.Item>
      </Nav>
      <NavLogoutDropdown avatar={avatar} />
    </Navbar.Collapse>
  );
}

export default NavMenu;
