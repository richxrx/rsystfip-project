import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import ActionerReports from '../components/ActionerReports';

function PageReportsPeople(): React.ReactNode {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | Generate reports</title>
      </Helmet>
      <Col md={12}>
        <h1 className="h3">Reportes por mes</h1>
        <ActionerReports />
      </Col>
    </Row>
  );
}

export default PageReportsPeople;
