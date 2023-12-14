import { Container, Paper, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { FormSchedulePeople, propsAction } from '../components'

function PageEditPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Edit people</title>
      </Helmet>

      <Container component="main" maxWidth="md">
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
          <Typography component="h1" variant="h5" gutterBottom align="center">
            Actualizar datos
          </Typography>

          <FormSchedulePeople action={propsAction.edit} />
        </Paper>
      </Container>
    </>
  )
}

export default PageEditPeople
