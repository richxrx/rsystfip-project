import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Statistics from "../components/Statistics";
import { AppointmentStatus } from "../features/programming/programmingSlice";

function PageStcsSchedule(): React.ReactNode {
  return (
    <Row className="g-3">
      <Helmet>
        <title>RSystfip | Statistics scheduled people</title>
      </Helmet>
      <Statistics appointment_status={AppointmentStatus.scheduled} />
    </Row>
  );
}

export default PageStcsSchedule;
