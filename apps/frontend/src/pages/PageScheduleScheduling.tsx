import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import FullCalendarScheduling from '../components/FullCalendarScheduling';

function PageScheduleScheduling(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Programming scheduling</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Agendamiento programado
        </Typography>
        <FullCalendarScheduling
          right="timeGridDay,timeGridWeek"
          initialView="timeGridDay"
        />
      </Container>
    </>
  );
}

export default PageScheduleScheduling;
