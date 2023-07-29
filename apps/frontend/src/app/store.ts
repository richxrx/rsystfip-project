import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import authReducer from "../features/auth/authSlice";
import calendarSlice from "../features/calendar/calendarSlice";
import cancellationsSlice from "../features/cancellations/cancellationsSlice";
import peopleSlice from "../features/people/peopleSlice";
import appointmentsSlice from "../features/appointments/appointmentsSlice";
import reportsSlice from "../features/reports/reportsSlice";
import resourcesSlice from "../features/resources/resourcesSlice";
import statisticsSlice from "../features/statistics/statisticsSlice";
import tempSlice from "../features/temp/tempSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    people: peopleSlice,
    users: usersSlice,
    cancelledPeople: cancellationsSlice,
    reports: reportsSlice,
    statistics: statisticsSlice,
    resources: resourcesSlice,
    programming: appointmentsSlice,
    calendar: calendarSlice,
    temp: tempSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
