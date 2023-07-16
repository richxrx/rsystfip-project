import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import RecoveryLinkPassword from "../components/RecoveryLinkPassword";

function PageLinkRecoveryPsw(): React.JSX.Element {
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
