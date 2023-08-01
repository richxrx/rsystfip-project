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
          <NavLink to="/home" className="nav-link">
            Inicio
          </NavLink>
        </Nav.Item>
        <ProtectedElement isAllowed={permissions.includes('admin')}>
          <Nav.Item>
            <NavLink to="/users" className="nav-link">
              Usuarios
            </NavLink>
          </Nav.Item>
        </ProtectedElement>
        <NavDropdown title="Agendar">
          <ProtectedElement isAllowed={permissions.includes('add')}>
            <NavLink to="/people/create" className="dropdown-item">
              Diario
            </NavLink>
          </ProtectedElement>

          <ProtectedElement isAllowed={permissions.includes('schedule')}>
            <NavLink to="/people/create-schedule" className="dropdown-item">
              Programado
            </NavLink>
          </ProtectedElement>
        </NavDropdown>
        <ProtectedElement isAllowed={permissions.includes('schedule')}>
          <Nav.Item>
            <NavLink to="/appointments" className="nav-link">
              Agendamientos
            </NavLink>
          </Nav.Item>
        </ProtectedElement>
        <ProtectedElement isAllowed={permissions.includes('statistics')}>
          <NavDropdown title="Estadísticas">
            <NavLink to="/statistics/daily" className="dropdown-item">
              Diario
            </NavLink>

            <NavLink to="/statistics/scheduled" className="dropdown-item">
              Programado
            </NavLink>
          </NavDropdown>
        </ProtectedElement>

        <ProtectedElement isAllowed={permissions.includes('reports')}>
          <Nav.Item>
            <NavLink to="/reports" className="nav-link">
              Reportes
            </NavLink>
          </Nav.Item>
        </ProtectedElement>

        <NavDropdown title="Historial">
          <NavLink to="/history/general" className="dropdown-item">
            General
          </NavLink>

          <NavLink to="/history/cancelled" className="dropdown-item">
            Cancelamientos
          </NavLink>
        </NavDropdown>

        <Nav.Item>
          <NavLink to="/faqs" className="nav-link">
            FAQs
          </NavLink>
        </Nav.Item>
      </Nav>
      <NavLogoutDropdown avatar={avatar} />
    </Navbar.Collapse>
  );
}

export default NavMenu;
