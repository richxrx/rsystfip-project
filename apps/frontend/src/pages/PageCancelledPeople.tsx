import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import TableCancelled from "../components/TableCancelled";

function PageCancelledPeople(): React.ReactNode {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | Cancelled people</title>
      </Helmet>
      <Col md={12}>
        <h1 className="h3">Citas canceladas</h1>
        <TableCancelled />
      </Col>
    </Row>
  );
}

export default PageCancelledPeople;
