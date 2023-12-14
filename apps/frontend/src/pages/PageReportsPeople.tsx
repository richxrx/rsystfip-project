import { Container, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Report } from '../components'

function PageReportsPeople(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Reports</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          Reportes por mes
        </Typography>

        <Report />
      </Container>
    </>
  )
}

export default PageReportsPeople
