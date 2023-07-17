import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Statistics from "../components/Statistics";
import { scheduleStatus } from "../features/programming/programmingSlice";

function PageStcsSchedule(): React.JSX.Element {
  return (
    <Row className="g-3">
      <Helmet>
        <title>RSystfip | Statistics scheduled people</title>
      </Helmet>
      <Statistics scheduling_type={scheduleStatus.scheduled} />
    </Row>
  );
}

export default PageStcsSchedule;
