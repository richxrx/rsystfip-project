import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { useAppSelector } from './app/hooks'
import AppRoutes from './components/AppRoutes'
import ContainerToast from './components/ui/ContainerToast'
import NavBar from './components/NavBar'
import ProtectedElement from './components/ui/ProtectedElement'
import SessionValidator from './components/SessionValidator'
import { AuthState } from './features/auth/authSlice'
import Footer from './components/ui/Footer'

const queryClient = new QueryClient()

function App(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth)

  const permissions = authState.userAuth.permissions

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProtectedElement isAllowed={authState.auth}>
            <SessionValidator />
          </ProtectedElement>

          <ProtectedElement isAllowed={authState.auth}>
            <NavBar permissions={permissions} />
          </ProtectedElement>

          <AppRoutes authState={authState} permissions={permissions} />

          <ProtectedElement isAllowed={authState.auth}>
            <Footer />
          </ProtectedElement>
        </BrowserRouter>

        <ContainerToast />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
