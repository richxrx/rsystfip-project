import { useEffect } from "react";
import { UNSET_STATUS } from "../constants";
import {
  QueryData,
  Reports,
  setReports,
  setReportsOrigen,
} from "../features/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import DaterReports from "./DaterReports";
import TableReports from "./TableReports";
import { useQuery } from "react-query";
import * as reportService from "../services/report.service";

function ActionerReports(): React.ReactNode {
  const dispatch = useAppDispatch();

  const reportsOrigenState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reportsOrigen
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  const { data, error, isError } = useQuery<[], any>(
    ["reports", queryDataState.start_time, queryDataState.end_time],
    () => reportService.getReports(queryDataState)
  );

  const filterReports = (dataToFilter = reportsOrigenState) => {
    dispatch(
      setReports(
        queryDataState.category_id !== UNSET_STATUS
          ? dataToFilter.filter(
              ({ category_id }) =>
                category_id.toString() === queryDataState.category_id
            )
          : dataToFilter
      )
    );
  };

  useEffect(() => {
    if (data) {
      filterReports(data);
      dispatch(setReportsOrigen(data));
    }
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  useEffect(() => {
    filterReports();
  }, [queryDataState.category_id]);

  return (
    <>
      <DaterReports errorReports={isError} />
      <TableReports />
    </>
  );
}

export default ActionerReports;
