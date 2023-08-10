import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthState } from '../features/auth/authSlice';
import PageSignin from '../pages/PageSignin';
import ProtectedRoute from './ProtectedRoute';
const PageDailyScheduling = lazy(() => import('../pages/PageDailyScheduling'));
const PageHistoryPeople = lazy(() => import('../pages/PageHistoryPeople'));
const PageAppointments = lazy(() => import('../pages/PageAppointments'));
const PageHistoryCancelledPeople = lazy(
  () => import('../pages/PageHistoryCanceledPeople'),
);
const PageChangePassword = lazy(() => import('../pages/PageChangePassword'));
const PageEditPeople = lazy(() => import('../pages/PageEditPeople'));
const PageFaqs = lazy(() => import('../pages/PageFaqs'));
const PageHome = lazy(() => import('../pages/PageHome'));
const PageLinkRecoveryPsw = lazy(() => import('../pages/PageLinkRecoveryPsw'));
const PageUsers = lazy(() => import('../pages/PageUsers'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const PageScheduleScheduling = lazy(
  () => import('../pages/PageScheduleScheduling'),
);
const PageRecoverPassword = lazy(() => import('../pages/PageRecoverPassword'));
const PageRegisterUser = lazy(() => import('../pages/PageRegisterUser'));
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
            <PageSignin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <ProtectedRoute isAllowed={!authState.auth} navigateTo="/home">
            <PageSignin />
          </ProtectedRoute>
        }
      />

      <Route element={<ProtectedRoute isAllowed={authState.auth} />}>
        <Route path="/home" element={<PageHome permissions={permissions} />} />

        <Route
          path="/users/change-password/:role"
          element={<PageChangePassword />}
        />

        <Route path="/history/general" element={<PageHistoryPeople />} />

        <Route
          path="/history/general/update/:id"
          element={<PageEditPeople />}
        />

        <Route
          path="/history/cancelled"
          element={<PageHistoryCancelledPeople />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('admin')}
            navigateTo="/home"
          />
        }
      >
        <Route path="/users" element={<PageUsers />} />

        <Route path="/users/create" element={<PageRegisterUser />} />

        <Route path="/users/delete/:role" element={<PageUsers />} />
      </Route>

      <Route
        path="/people/create"
        element={
          <ProtectedRoute
            isAllowed={authState.auth && permissions.includes('add')}
            navigateTo="/home"
          >
            <PageDailyScheduling />
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
            <PageScheduleScheduling />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute isAllowed={authState.auth} navigateTo="/home">
            <PageAppointments />
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

      <Route path="/recover-password" element={<PageRecoverPassword />} />

      <Route
        path="/:resetToken/recover-password"
        element={<PageLinkRecoveryPsw />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
