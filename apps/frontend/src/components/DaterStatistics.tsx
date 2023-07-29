import { Col, FloatingLabel, FormControl, FormSelect } from "react-bootstrap";
import { AppointmentStatus } from "../features/appointments/appointmentsSlice";
import {
  QueryData,
  setQueryData,
} from "../features/statistics/statisticsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { THandleChangeITS } from "../types/THandleChanges";

interface IProps {
  appointment_status: AppointmentStatus;
}

function DaterStatistics({ appointment_status }: IProps): React.ReactNode {
  const dispatch = useAppDispatch();

  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  );

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setQueryData([
        appointment_status,
        {
          ...queryDataState,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };

  return (
    <>
      <Col md={2}>
        <FloatingLabel label="Desde:">
          <FormControl
            name="start_time"
            onChange={handleChange}
            value={queryDataState.start_time}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Hasta:">
          <FormControl
            name="end_time"
            onChange={handleChange}
            value={queryDataState.end_time}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Gráfica:">
          <FormSelect
            name="chart_type"
            onChange={handleChange}
            value={queryDataState.chart_type}
          >
            <option value="bar">Barra Vertical</option>
            <option value="polarArea">Polar Area</option>
            <option value="line">Línea</option>
            <option value="pie">Torta</option>
            <option value="doughnut">Doughnut</option>
          </FormSelect>
        </FloatingLabel>
      </Col>
    </>
  );
}

export default DaterStatistics;
