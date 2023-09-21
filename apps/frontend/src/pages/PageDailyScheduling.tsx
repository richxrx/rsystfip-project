import { Container, Paper, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import FormSchedulePeople, {
  propsAction,
} from '../components/FormSchedulePeople';

function PageDailyScheduling(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Daily scheduling</title>
      </Helmet>

      <Container component="main" maxWidth="md">
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
          <Typography component="h1" variant="h5" gutterBottom align="center">
            Agendamiento diario
          </Typography>

          <FormSchedulePeople action={propsAction.add} />
        </Paper>
      </Container>
    </>
  );
}

export default PageDailyScheduling;
