import { Box, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { GoHome } from "../components/ui";

function PageNotFound(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Not found</title>
      </Helmet>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={"/rsystfip.svg"}
            alt="RSystfip logotype"
            width={72}
            height={57}
            sx={{ mb: 4 }}
          />

          <Typography component="h1" variant="h3" gutterBottom>
            Error 404
          </Typography>

          <Typography variant="body1" gutterBottom>
            Oops! The page you're looking for doesn't exist.
          </Typography>

          <GoHome />
        </Box>
      </Container>
    </>
  );
}

export default PageNotFound;
