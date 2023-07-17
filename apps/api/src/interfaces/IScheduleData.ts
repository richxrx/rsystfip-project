export enum scheduleStatus {
  daily = "daily",
  scheduled = "scheduled",
  cancelled = "cancelled",
}

export interface IScheduleData {
  person_id?: number;
  date_filter?: string;
  start_date?: string;
  end_date?: string;
  modification?: string;
  status: scheduleStatus;
  color?: string;
}
