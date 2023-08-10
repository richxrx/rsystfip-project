import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import TableUsers from '../components/TableUsers';

function PageUsers(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Users</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginY={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Administrar usuarios
        </Typography>

        <Fab
          component={RouterLink}
          to="/users/create"
          variant="extended"
          size="small"
          color="primary"
          sx={{ mb: 2 }}
        >
          <AddIcon sx={{ mr: 1 }} />

          <Typography fontWeight={500} sx={{ mr: 1 }}>
            Add user
          </Typography>
        </Fab>

        <TableUsers />
      </Container>
    </>
  );
}

export default PageUsers;
