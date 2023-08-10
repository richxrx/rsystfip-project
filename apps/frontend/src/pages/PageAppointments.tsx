import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import FullCalendarScheduling from '../components/FullCalendarScheduling';

function PageAppointments(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Appointments</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Ver agendamientos programados
        </Typography>

        <FullCalendarScheduling
          right="listMonth,dayGridMonth"
          initialView="listMonth"
        />
      </Container>
    </>
  );
}

export default PageAppointments;
