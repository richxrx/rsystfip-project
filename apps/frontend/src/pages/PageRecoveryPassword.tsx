import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import RecoveryPassword from "../components/RecoveryPassword";

function PageRecoveryPassword(): React.JSX.Element {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | I forget my password</title>
      </Helmet>
      <RecoveryPassword />
    </Row>
  );
}

export default PageRecoveryPassword;
