import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { FullCalendarScheduling } from "../components";

const plugins = [dayGridPlugin, timeGridPlugin];

function PageScheduleScheduling(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Programming scheduling</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
        >
          Agendamiento programado
        </Typography>

        <FullCalendarScheduling
          right="timeGridDay,timeGridWeek"
          initialView="timeGridDay"
          plugins={plugins}
        />
      </Container>
    </>
  );
}

export default PageScheduleScheduling;
