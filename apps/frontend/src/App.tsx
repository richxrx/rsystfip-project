import { Suspense } from 'react';
import { Container } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { useAppSelector } from './app/hooks';
import AppRoutes from './components/AppRoutes';
import ContainerToast from './components/ContainerToast';
import Footer from './components/Footer';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import ProtectedElement from './components/ProtectedElement';
import SessionValidator from './components/SessionValidator';
import { AuthState } from './features/auth/authSlice';

const queryClient = new QueryClient();

function App(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const avatar = authState.auth ? `/${authState.userAuth.role_name}.png` : '';
  const permissions = authState.userAuth.permissions;

  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <ProtectedElement isAllowed={authState.auth}>
              <SessionValidator />
            </ProtectedElement>

            <ProtectedElement isAllowed={authState.auth}>
              <NavBar avatar={avatar} permissions={permissions} />
            </ProtectedElement>

            <AppRoutes authState={authState} permissions={permissions} />

            <Footer />
          </Suspense>
        </BrowserRouter>
      </Container>

      <ContainerToast />
    </QueryClientProvider>
  );
}

export default App;
