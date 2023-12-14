import AddIcon from '@mui/icons-material/Add'
import { Container, Fab, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom'
import { TableUsers } from '../components'

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
          variant="circular"
          size="small"
          color="primary"
          sx={{ mb: 2 }}
        >
          <AddIcon />
        </Fab>

        <TableUsers />
      </Container>
    </>
  )
}

export default PageUsers
