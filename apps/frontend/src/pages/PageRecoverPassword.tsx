import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet';
import RecoveryPassword from '../components/RecoveryPassword';
import Copyright from '../components/Copyright';

function PageRecoverPassword(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Recover password</title>
      </Helmet>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <RecoveryPassword />

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

export default PageRecoverPassword;
