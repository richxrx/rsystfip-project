import { Container } from '@mui/material'
import { Helmet } from 'react-helmet'
import RecoveryLinkPassword from '../components/RecoveryLinkPassword'

function PageLinkRecoveryPsw(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Recover password</title>
      </Helmet>

      <Container component="main" maxWidth="sm">
        <RecoveryLinkPassword />
      </Container>
    </>
  )
}

export default PageLinkRecoveryPsw
