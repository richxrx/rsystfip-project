import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet';
import RecoveryLinkPassword from '../components/RecoveryLinkPassword';

function PageLinkRecoveryPsw(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Recover password</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <RecoveryLinkPassword />
      </Container>
    </>
  );
}

export default PageLinkRecoveryPsw;
