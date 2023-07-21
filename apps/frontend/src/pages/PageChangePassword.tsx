import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FetcherDataForChangePsw from "../components/FetcherDataForChangePsw";

function PageChangePassword(): React.ReactNode {
  return (
    <Row>
      <Helmet>
        <title>RSystfip | Change password users</title>
      </Helmet>
      <FetcherDataForChangePsw />
    </Row>
  );
}

export default PageChangePassword;
