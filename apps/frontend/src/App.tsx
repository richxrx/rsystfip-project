import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { useAppSelector } from './app/hooks'
import { AppRoutes, SessionValidator } from './components'
import {
  ContainerToast,
  Footer,
  NavBar,
  ProtectedElement
} from './components/ui'
import type { AuthState } from './features/auth/authSlice'

const queryClient = new QueryClient()

function App(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#3366CC'
          },
          error: {
            main: '#E6161C'
          }
        }
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProtectedElement isAllowed={authState.auth}>
            <SessionValidator />
          </ProtectedElement>

          <ProtectedElement isAllowed={authState.auth}>
            <NavBar permissions={authState.userAuth.permissions} />
          </ProtectedElement>

          <AppRoutes />

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
