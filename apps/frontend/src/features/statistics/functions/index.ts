import {
  validSchedulingTypes,
  type Data,
  type StatisticsState,
} from "../statisticsSlice";

export const updateDataBySchedulingType = (
  state: StatisticsState,
  appointmentStatus: string,
  updateData: Partial<Data>,
): StatisticsState => {
  if (!(appointmentStatus in validSchedulingTypes)) return state;

  return {
    ...state,
    [appointmentStatus]: {
      ...state[appointmentStatus],
      ...updateData,
    },
  };
};
