import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { AuthState } from "../features/auth/authSlice";
import {
  PageAppointments,
  PageChangePassword,
  PageDailyScheduling,
  PageEditPeople,
  PageFaqs,
  PageHistoryCancelledPeople,
  PageHistoryPeople,
  PageHome,
  PageLinkRecoveryPsw,
  PageNotFound,
  PageRecoverPassword,
  PageRegisterUser,
  PageReportsPeople,
  PageScheduleScheduling,
  PageSignin,
  PageStcsDaily,
  PageStcsSchedule,
  PageUsers,
} from "../pages";
import { ProtectedRoute } from "./ui";

function AppRoutes(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const permissions = authState.userAuth.permissions;

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
        <Route path="/home" element={<PageHome />} />

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
            isAllowed={authState.auth && permissions.includes("admin")}
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
            isAllowed={authState.auth && permissions.includes("add")}
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
            isAllowed={authState.auth && permissions.includes("schedule")}
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
            isAllowed={authState.auth && permissions.includes("reports")}
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
            isAllowed={authState.auth && permissions.includes("statistics")}
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
            isAllowed={authState.auth && permissions.includes("statistics")}
            navigateTo="/home"
          >
            <PageStcsSchedule />
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
