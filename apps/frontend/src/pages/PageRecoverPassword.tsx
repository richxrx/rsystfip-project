import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { RecoveryPassword } from "../components";
import { Copyright } from "../components/ui";

function PageRecoverPassword(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Recover password</title>
      </Helmet>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <RecoveryPassword />

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

export default PageRecoverPassword;
