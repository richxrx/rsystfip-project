import {
  Data,
  StatisticsState,
  validSchedulingTypes,
} from "../statisticsSlice";

export function updateDataBySchedulingType(
  state: StatisticsState,
  appointmentStatus: string,
  updateData: Partial<Data>
): StatisticsState {
  if (!(appointmentStatus in validSchedulingTypes)) return state;

  return {
    ...state,
    [appointmentStatus]: {
      ...state[appointmentStatus],
      ...updateData,
    },
  };
}
