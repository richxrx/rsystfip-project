import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaUserPlus } from 'react-icons/fa';
import { IoCalendarNumber } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ProtectedElement from '../components/ProtectedElement';
import UserLoggedInfo from '../components/UserLoggedInfo';

interface IProps {
  permissions: Array<string>;
}

function PageHome({ permissions }: IProps): React.ReactNode {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | Home</title>
      </Helmet>
      <Col md={12}>
        <UserLoggedInfo />
        <ProtectedElement isAllowed={permissions.includes('add')}>
          <Link to="/people/create" className="btn btn-primary m-1">
            Diario <FaUserPlus className="mb-1" />
          </Link>
        </ProtectedElement>
        <Link to="/people/create-schedule" className="btn btn-primary m-1">
          Programar <IoCalendarNumber className="mb-1" />
        </Link>
      </Col>
    </Row>
  );
}

export default PageHome;
