import { Container, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { TableHistoryPeople } from '../components'

function PageHistoryPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | People history</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Personas agendadas
        </Typography>

        <TableHistoryPeople />
      </Container>
    </>
  )
}

export default PageHistoryPeople
