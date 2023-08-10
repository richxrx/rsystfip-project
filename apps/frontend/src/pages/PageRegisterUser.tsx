import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import FormUserAdd from '../components/FormUserAdd';

function PageRegisterUser(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Register user</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
          >
            Registrar nuevo usuario
          </Typography>

          <Card.Body className="my-4">
            <FormUserAdd />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default PageRegisterUser;
