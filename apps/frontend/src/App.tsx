import { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import ContainerToast from "./components/ContainerToast";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProtectedElement from "./components/ProtectedElement";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthState } from "./features/auth/authSlice";
import { useAppSelector } from "./app/hooks";
import PageAuth from "./pages/PageAuth";
const SessionValidator = lazy(() => import("./components/SessionValidator"));
const NavBar = lazy(() => import("./components/NavBar"));
const PageAddPeople = lazy(() => import("./pages/PageAddPeople"));
const PageAgendatedPeople = lazy(() => import("./pages/PageAgendatedPeople"));
const PageCalendar = lazy(() => import("./pages/PageCalendar"));
const PageCancelledPeople = lazy(() => import("./pages/PageCancelledPeople"));
const PageChangePassword = lazy(() => import("./pages/PageChangePassword"));
const PageEditPeople = lazy(() => import("./pages/PageEditPeople"));
const PageFaqs = lazy(() => import("./pages/PageFaqs"));
const PageHome = lazy(() => import("./pages/PageHome"));
const PageLinkRecoveryPsw = lazy(() => import("./pages/PageLinkRecoveryPsw"));
const PageManageUsers = lazy(() => import("./pages/PageManageUsers"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PageProgramming = lazy(() => import("./pages/PageProgramming"));
const PageRecoveryPassword = lazy(() => import("./pages/PageRecoveryPassword"));
const PageRegisterUsers = lazy(() => import("./pages/PageRegisterUsers"));
const PageReportsPeople = lazy(() => import("./pages/PageReportsPeople"));
const PageStcsDaily = lazy(() => import("./pages/PageStcsDaily"));
const PageStcsScheduled = lazy(() => import("./pages/PageStcsScheduled"));

const queryClient = new QueryClient();

function App(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const avatar = authState.auth
    ? `/img/${authState.userAuth.role_name}.png`
    : "";
  const permissions = authState.userAuth.permissions;

  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProtectedElement isAllowed={authState.auth}>
            <SessionValidator />
          </ProtectedElement>
          <Container fluid>
            <ProtectedElement isAllowed={authState.auth}>
              <NavBar avatar={avatar} permissions={permissions} />
            </ProtectedElement>
            <Routes>
              <Route
                index
                element={
                  <ProtectedRoute
                    isAllowed={!authState.auth}
                    navigateTo="/home/welcome"
                  >
                    <PageAuth />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/auth/login"
                element={
                  <ProtectedRoute
                    isAllowed={!authState.auth}
                    navigateTo="/home/welcome"
                  >
                    <PageAuth />
                  </ProtectedRoute>
                }
              />

              <Route element={<ProtectedRoute isAllowed={authState.auth} />}>
                <Route
                  path="/home/welcome"
                  element={<PageHome permissions={permissions} />}
                />
                <Route
                  path="/users/manage/password/:role/change"
                  element={<PageChangePassword />}
                />
                <Route path="/people/view" element={<PageAgendatedPeople />} />
                <Route
                  path="/people/cancelled"
                  element={<PageCancelledPeople />}
                />
                <Route
                  path="/people/view/:id/edit"
                  element={<PageEditPeople />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    isAllowed={authState.auth && permissions.includes("admin")}
                    navigateTo="/home/welcome"
                  />
                }
              >
                <Route path="/users/manage" element={<PageManageUsers />} />
                <Route
                  path="/users/manage/add"
                  element={<PageRegisterUsers />}
                />
                <Route
                  path="/users/manage/:role/delete"
                  element={<PageManageUsers />}
                />
              </Route>

              <Route
                path="/people/add"
                element={
                  <ProtectedRoute
                    isAllowed={authState.auth && permissions.includes("add")}
                    navigateTo="/home/welcome"
                  >
                    <PageAddPeople />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/people/schedule"
                element={
                  <ProtectedRoute
                    isAllowed={
                      authState.auth && permissions.includes("schedule")
                    }
                    navigateTo="/home/welcome"
                  >
                    <PageProgramming />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/people/preview"
                element={
                  <ProtectedRoute
                    isAllowed={authState.auth}
                    navigateTo="/home/welcome"
                  >
                    <PageCalendar />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/people/reports"
                element={
                  <ProtectedRoute
                    isAllowed={
                      authState.auth && permissions.includes("reports")
                    }
                    navigateTo="/home/welcome"
                  >
                    <PageReportsPeople />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/people/statistics/daily"
                element={
                  <ProtectedRoute
                    isAllowed={
                      authState.auth && permissions.includes("statistics")
                    }
                    navigateTo="/home/welcome"
                  >
                    <PageStcsDaily />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/people/statistics/scheduled"
                element={
                  <ProtectedRoute
                    isAllowed={
                      authState.auth && permissions.includes("statistics")
                    }
                    navigateTo="/home/welcome"
                  >
                    <PageStcsScheduled />
                  </ProtectedRoute>
                }
              />

              <Route path="/help/asks/frecuently" element={<PageFaqs />} />

              <Route
                path="/forget/my/password"
                element={<PageRecoveryPassword />}
              />

              <Route
                path="/forget/my/password/:resetToken/recovery"
                element={<PageLinkRecoveryPsw />}
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>

          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
      <ContainerToast />
    </Suspense>
  );
}

export default App;
