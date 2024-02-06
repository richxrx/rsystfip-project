import CodeIcon from "@mui/icons-material/Code";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AuthState } from "../../features/auth/authSlice";

function Footer(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  return (
    <Container maxWidth="lg" sx={{ py: 4, my: 4 }}>
      <footer>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
        >
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">
              © 2023 Tecnología en gestión informática{" "}
              <CodeIcon fontSize="small" sx={{ my: -0.5 }} />
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link
              to="/"
              component={RouterLink}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 3, md: 0 },
                mr: { xs: 0, md: "auto" },
              }}
            >
              <Box
                component="img"
                alt="RSystfip logotype"
                src={"/rsystfip.svg"}
                width={40}
                height={32}
                sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <nav>
              <Link
                to={!authState.auth ? "/" : "/home"}
                component={RouterLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                Inicio
              </Link>

              <Link
                to="/faqs"
                component={RouterLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                FAQs
              </Link>

              <Link
                to="#"
                component={RouterLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                Acerca de
              </Link>

              <Link
                to="/recover-password"
                component={RouterLink}
                variant="body2"
                color="textSecondary"
              >
                Olvidó su contraseña?
              </Link>
            </nav>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
}

export default Footer;
