import { Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import rsystfipLogo from '../assets/rsystfip.svg';

function HeaderLogin(): React.ReactNode {
  return (
    <Container className="text-center mt-2">
      <Link to="/">
        <Image src={rsystfipLogo} width="72" height="57" alt="rsystfip" />
      </Link>
      <h1 className="h6 mt-3">RSYSTFIP</h1>
      <Card className="border-0 m-5">
        <Card.Body>
          <Card.Text>
            Sóftware para agendamiento de visitas Rectoría -{' '}
            <strong>ITFIP</strong>
          </Card.Text>
          <Link to="https://www.itfip.edu.co">
            <Image src="/admin.png" height="55" width="55" alt="itfip" />
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default HeaderLogin;
