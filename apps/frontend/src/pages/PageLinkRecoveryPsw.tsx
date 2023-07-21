import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import RecoveryLinkPassword from "../components/RecoveryLinkPassword";

function PageLinkRecoveryPsw(): React.ReactNode {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | Recover my password</title>
      </Helmet>
      <RecoveryLinkPassword />
    </Row>
  );
}

export default PageLinkRecoveryPsw;
