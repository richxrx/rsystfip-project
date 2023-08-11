import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet';
import FetcherDataForChangePsw from '../components/FetcherDataForChangePsw';

function PageChangePassword(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Change password</title>
      </Helmet>

      <Container component="main" maxWidth="sm">
        <FetcherDataForChangePsw />
      </Container>
    </>
  );
}

export default PageChangePassword;
