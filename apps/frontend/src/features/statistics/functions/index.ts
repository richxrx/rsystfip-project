import {
  Data,
  StatisticsState,
  validSchedulingTypes,
} from "../statisticsSlice";

export function updateDataBySchedulingType(
  state: StatisticsState,
  schedulingType: string,
  updateData: Partial<Data>
): StatisticsState {
  if (!(schedulingType in validSchedulingTypes)) return state;

  return {
    ...state,
    [schedulingType]: {
      ...state[schedulingType],
      ...updateData,
    },
  };
}
