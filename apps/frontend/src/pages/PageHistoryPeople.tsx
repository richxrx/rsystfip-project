import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import TableHistoryPeople from '../components/TableHistoryPeople';

function PageHistoryPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | People history</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Personas agendadas
        </Typography>

        <TableHistoryPeople />
      </Container>
    </>
  );
}

export default PageHistoryPeople;
