import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function GoHome(): React.ReactNode {
  return (
    <Button
      component={RouterLink}
      to="/home"
      variant="contained"
      size="large"
      startIcon={<ArrowBackIcon />}
      sx={{ mt: 3 }}
    >
      Go Back Home
    </Button>
  );
}

export default GoHome;
