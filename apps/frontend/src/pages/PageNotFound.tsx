import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import rsystfipLogo from '../assets/rsystfip.svg';
import GoHome from '../components/GoHome';

function PageNotFound(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Not found</title>
      </Helmet>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={rsystfipLogo}
            alt="Rsystfip"
            width={72}
            height={57}
            sx={{ mb: 4 }}
          />

          <Typography component="h1" variant="h3" gutterBottom>
            Error 404
          </Typography>

          <Typography variant="body1" gutterBottom>
            Oops! The page you're looking for doesn't exist.
          </Typography>

          <GoHome />
        </Box>
      </Container>
    </>
  );
}

export default PageNotFound;
