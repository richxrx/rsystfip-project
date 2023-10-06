import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import FullCalendarScheduling from '../components/FullCalendarScheduling';

function PageAppointments(): React.ReactNode {
  const plugins = [dayGridPlugin, listPlugin];

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
          plugins={plugins}
        />
      </Container>
    </>
  );
}

export default PageAppointments;
