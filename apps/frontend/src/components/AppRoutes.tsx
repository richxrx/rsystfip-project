import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthState } from '../features/auth/authSlice';
import PageAuth from '../pages/PageAuth';
import ProtectedRoute from './ProtectedRoute';
const PageAddPeople = lazy(() => import('../pages/PageAddPeople'));
const PageAgendatedPeople = lazy(() => import('../pages/PageAgendatedPeople'));
const PageCalendar = lazy(() => import('../pages/PageCalendar'));
const PageCancelledPeople = lazy(() => import('../pages/PageCancelledPeople'));
const PageChangePassword = lazy(() => import('../pages/PageChangePassword'));
const PageEditPeople = lazy(() => import('../pages/PageEditPeople'));
const PageFaqs = lazy(() => import('../pages/PageFaqs'));
const PageHome = lazy(() => import('../pages/PageHome'));
const PageLinkRecoveryPsw = lazy(() => import('../pages/PageLinkRecoveryPsw'));
const PageManageUsers = lazy(() => import('../pages/PageManageUsers'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const PageProgramming = lazy(() => import('../pages/PageProgramming'));
const PageRecoveryPassword = lazy(
  () => import('../pages/PageRecoveryPassword'),
);
const PageRegisterUsers = lazy(() => import('../pages/PageRegisterUsers'));
const PageReportsPeople = lazy(() => import('../pages/PageReportsPeople'));
const PageStcsDaily = lazy(() => import('../pages/PageStcsDaily'));
const PageStcsScheduled = lazy(() => import('../pages/PageStcsScheduled'));

interface IProps {
  authState: AuthState;
  permissions: string[];
}

function AppRoutes({ authState, permissions }: IProps) {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute isAllowed={!authState.auth} navigateTo="/home">
            <PageAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <ProtectedRoute isAllowed={!authState.auth} navigateTo="/home">
            <PageAuth />
          </ProtectedRoute>
        }
      />

      <Route element={<ProtectedRoute isAllowed={authState.auth} />}>
        <Route path="/home" element={<PageHome permissions={permissions} />} />

        <Route
          path="/users/change-password/:role"
          element={<PageChangePassword />}
        />

        <Route path="/history/general" element={<PageAgendatedPeople />} />

        <Route
          path="/history/general/update/:id"
          element={<PageEditPeople />}
        />

        <Route path="/history/cancelled" element={<PageCancelledPeople />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('admin')}
            navigateTo="/home"
          />
        }
      >
        <Route path="/users" element={<PageManageUsers />} />

        <Route path="/users/create" element={<PageRegisterUsers />} />

        <Route path="/users/delete/:role" element={<PageManageUsers />} />
      </Route>

      <Route
        path="/people/create"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('add')}
            navigateTo="/home"
          >
            <PageAddPeople />
          </ProtectedRoute>
        }
      />

      <Route
        path="/people/create-schedule"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('schedule')}
            navigateTo="/home"
          >
            <PageProgramming />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute isAllowed={authState.auth} navigateTo="/home">
            <PageCalendar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('reports')}
            navigateTo="/home"
          >
            <PageReportsPeople />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistics/daily"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('statistics')}
            navigateTo="/home"
          >
            <PageStcsDaily />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistics/scheduled"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('statistics')}
            navigateTo="/home"
          >
            <PageStcsScheduled />
          </ProtectedRoute>
        }
      />

      <Route path="/faqs" element={<PageFaqs />} />

      <Route path="/recover-password" element={<PageRecoveryPassword />} />

      <Route
        path="/:resetToken/recover-password"
        element={<PageLinkRecoveryPsw />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
