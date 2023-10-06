import { Container } from '@mui/material'
import { Helmet } from 'react-helmet'
import Statistics from '../components/Statistics'
import { AppointmentStatus } from '../features/appointments/appointmentsSlice'

function PageStcsSchedule(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Statistics scheduled people</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Statistics appointment_status={AppointmentStatus.scheduled} />
      </Container>
    </>
  )
}

export default PageStcsSchedule
