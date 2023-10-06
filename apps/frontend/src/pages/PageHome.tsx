import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import ProtectedElement from '../components/ui/ProtectedElement'
import { AuthState } from '../features/auth/authSlice'

interface IProps {
  permissions: Array<string>
}

function PageHome({ permissions }: IProps): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth)

  return (
    <>
      <Helmet>
        <title>RSystfip | Home</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h3"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          {`${'Bienvenido(a)'} ${authState.userAuth.role_name}: ${
            authState.userAuth.first_name
          } ${authState.userAuth.last_name}`}
        </Typography>

        <ButtonGroup variant="outlined">
          <ProtectedElement isAllowed={permissions.includes('add')}>
            <Button component={RouterLink} to="/people/create">
              Agendamiento diario
            </Button>
          </ProtectedElement>

          <Button component={RouterLink} to="/people/create-schedule">
            Agendamiento programado
          </Button>
        </ButtonGroup>
      </Container>
    </>
  )
}

export default PageHome
