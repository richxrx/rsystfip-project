import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import TableHistoryCanceledPeople from '../components/TableHistoryCanceledPeople';

function PageHistoryCancelledPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Canceled people history</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Citas canceladas
        </Typography>

        <TableHistoryCanceledPeople />
      </Container>
    </>
  );
}

export default PageHistoryCancelledPeople;
