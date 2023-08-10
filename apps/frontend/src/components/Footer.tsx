import CodeIcon from '@mui/icons-material/Code';
import { Col, Container, Image, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import rsystfipLogo from '../assets/rsystfip.svg';
import { AuthState } from '../features/auth/authSlice';

function Footer(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  return (
    <Container fluid className="py-4 my-4">
      <footer className="d-flex flex-wrap justify-content-between align-items-center">
        <Col md={4} className="mb-0 text-body-secondary">
          © 2023 Tecnología en gestión informatica
          <CodeIcon />
        </Col>

        <Col md={4}>
          <Link
            to="/"
            className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <Image src={rsystfipLogo} alt="Rsystfip" width="40" height="32" />
          </Link>
        </Col>

        <Col md={4}>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Link
                to={!authState.auth ? '/' : '/home'}
                className="nav-link px-2 text-body-secondary"
              >
                Inicio
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link to="/faqs" className="nav-link px-2 text-body-secondary">
                FAQs
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link to="#" className="nav-link px-2 text-body-secondary">
                Acerca de
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                to="/recover-password"
                className="nav-link px-2 text-body-secondary"
              >
                Olvidó su contraseña?
              </Link>
            </Nav.Item>
          </Nav>
        </Col>
      </footer>
    </Container>
  );
}

export default Footer;
