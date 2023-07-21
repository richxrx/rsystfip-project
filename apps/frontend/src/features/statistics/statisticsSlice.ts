import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICounts } from "../../interfaces/ICounts";
import { IKeyBool } from "../../interfaces/IKeyBool";
import { updateDataBySchedulingType } from "./functions";
import { endOfMonth, format } from "date-fns";

export interface QueryData {
  start_time: string;
  end_time: string;
  chart_type: string;
}

export interface Data {
  mostAgendatedOnRange: Array<ICounts>;
  mostAgendatedAllTime: Array<ICounts>;
  queryData: QueryData;
}

export interface StatisticsState {
  daily: Data;
  scheduled: Data;
  [scheduling_type: string]: Data;
}

export const validSchedulingTypes: IKeyBool = {
  daily: true,
  scheduled: true,
};

const queryDataInitialState: QueryData = {
  start_time: format(new Date(), "yyyy-MM-01"),
  end_time: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  chart_type: "bar",
};

const initialState: StatisticsState = {
  daily: {
    mostAgendatedOnRange: [],
    mostAgendatedAllTime: [],
    queryData: queryDataInitialState,
  },
  scheduled: {
    mostAgendatedOnRange: [],
    mostAgendatedAllTime: [],
    queryData: queryDataInitialState,
  },
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setMostAgendatedOnRange(
      state,
      {
        payload: [appointmentStatus, mostAgendatedOnRange],
      }: PayloadAction<[string, Array<ICounts>]>
    ): StatisticsState {
      return updateDataBySchedulingType(state, appointmentStatus, {
        mostAgendatedOnRange,
      });
    },
    setMostAgendatedAllTime(
      state,
      {
        payload: [appointmentStatus, mostAgendatedAllTime],
      }: PayloadAction<[string, Array<ICounts>]>
    ): StatisticsState {
      return updateDataBySchedulingType(state, appointmentStatus, {
        mostAgendatedAllTime,
      });
    },
    setQueryData(
      state,
      {
        payload: [appointmentStatus, queryData],
      }: PayloadAction<[string, QueryData]>
    ): StatisticsState {
      return updateDataBySchedulingType(state, appointmentStatus, {
        queryData,
      });
    },
    resetQueryDataStatistics(state): StatisticsState {
      return {
        ...state,
        daily: {
          ...state.daily,
          queryData: queryDataInitialState,
        },
        scheduled: {
          ...state.scheduled,
          queryData: queryDataInitialState,
        },
      };
    },
  },
});

export const {
  setMostAgendatedOnRange,
  setMostAgendatedAllTime,
  setQueryData,
  resetQueryDataStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
