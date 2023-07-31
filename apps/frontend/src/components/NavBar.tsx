import { Container, Image, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import rsystfipLogo from '../assets/rsystfip.svg';
import NavMenu from './NavMenu';

interface IProps {
  avatar: string;
  permissions: Array<string>;
}

function NavBar({ avatar, permissions }: IProps): React.ReactNode {
  return (
    <Navbar expand="lg" bg="light" fixed="top">
      <Container fluid>
        <Navbar.Brand className="px-lg-3">
          <Link to="/">
            <Image src={rsystfipLogo} alt="Rsystfip" width="40" height="32" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <NavMenu permissions={permissions} avatar={avatar} />
      </Container>
    </Navbar>
  );
}

export default NavBar;
