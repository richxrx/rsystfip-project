import { Container, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import FormSchedulePeople, {
  propsAction,
} from '../components/FormSchedulePeople';

function PageEditPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Edit people</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
          >
            Actualizar Datos
          </Typography>

          <Card.Body className="my-4">
            <FormSchedulePeople action={propsAction.edit} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default PageEditPeople;
