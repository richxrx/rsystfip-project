import { Box, Grid, Paper, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import FormSignin from './FormSignin';

function PageSignin(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Sign in</title>
      </Helmet>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/PHOTO-ENTRY-ITFIP-1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ px: 3 }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              alt="RSystfip logotype"
              src={'/rsystfip.svg'}
              width={40}
              height={32}
              sx={{ m: 1 }}
            />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Typography component="h1" variant="subtitle1" align="center">
              Agendamiento visitas Rectoría - ITFIP
            </Typography>

            <FormSignin />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PageSignin;
