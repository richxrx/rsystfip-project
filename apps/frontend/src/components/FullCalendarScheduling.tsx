import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { EventSourceInput, globalPlugins } from "fullcalendar";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import {
  ICalendarState,
  setCalendarEvents,
} from "../features/calendar/calendarSlice";
import {
  FormDataState,
  AppointmentStatus,
  setFormData,
} from "../features/appointments/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { notify } from "../libs/toast";
import * as scheduleService from "../services/schedule.service";
import LoadCalendar from "./LoadCalendar";
import ModalCancellPersonConfirmation from "./ModalCancellPersonConfirmation";
import ModalSchedulePeopleForm from "./ModalSchedulePeopleForm";
import Responsive from "./Responsive";
import { propsAction } from "./FormSchedulePeople";

interface IProps {
  right: string;
  initialView: string;
}

function FullCalendarScheduling({
  right,
  initialView,
}: IProps): React.ReactNode {
  const action = propsAction.schedule;

  const formDataState: FormDataState = useAppSelector(
    ({ appointments }) => appointments.formData.schedule
  );
  const calendarEventsState: ICalendarState = useAppSelector(
    ({ calendar }) => calendar
  );

  const dispatch = useAppDispatch();

  // Modal states
  const [stateModalCancell, setStateModalCancell] = useState(false);
  const [stateModalScheduling, setStateModalScheduling] = useState(false);

  // Modal methods
  const closeModalCancell = (): void => setStateModalCancell(false);
  const showModalCancell = (): void => setStateModalCancell(true);
  const closeModalScheduling = (): void => setStateModalScheduling(false);
  const showModalScheduling = (): void => setStateModalScheduling(true);

  const loadEventsRef = useRef<HTMLDivElement>(null);

  const { data, error } = useQuery<[], any>(
    [propsAction.schedule, calendarEventsState.changes],
    scheduleService.getEvents
  );

  useEffect(() => {
    if (data) dispatch(setCalendarEvents(data));
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <Responsive>
      <LoadCalendar loadEventsRef={loadEventsRef} />
      <ModalSchedulePeopleForm
        stateModalScheduling={stateModalScheduling}
        closeModalScheduling={closeModalScheduling}
      />
      <ModalCancellPersonConfirmation
        stateModalCancell={stateModalCancell}
        closeModalCancell={closeModalCancell}
      />
      <Container fluid className="schg-sm lh-1">
        <FullCalendar
          height="auto"
          headerToolbar={{
            left: "prevYear prev,next nextYear today",
            center: "title",
            right,
          }}
          locales={[esLocale]}
          locale="es-us"
          navLinks
          nowIndicator
          dayHeaders
          weekends
          dayHeaderFormat={{
            weekday: "long",
            day: "numeric",
          }}
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: "06:00",
            endTime: "22:00",
          }}
          weekNumbers
          weekNumberCalculation="ISO"
          selectable
          selectMirror
          select={({ view, start, end }) => {
            if ("dayGridMonth" === view.type) return;

            const now = new Date();
            if (start < now) {
              view.calendar.unselect();
              return notify(
                "No se puede agendar en una fecha que ya ha pasado.",
                { type: "warning" }
              );
            }

            if (
              start.getHours() < 6 ||
              end.getHours() > 21 ||
              end.getHours() === 0
            ) {
              // The selection is out of allow range, cancel
              view.calendar.unselect();
              return notify("Agendamientos no disponible en ese horario.", {
                type: "warning",
              });
            }

            showModalScheduling();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  start_time: format(start, "yyyy-MM-dd HH:mm:ss"),
                  end_time: format(end, "yyyy-MM-dd HH:mm:ss"),
                  status: AppointmentStatus.scheduled,
                },
              ])
            );
          }}
          eventClick={({ event }) => {
            showModalCancell();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  id: event.id,
                },
              ])
            );
          }}
          editable
          dayMaxEvents
          events={calendarEventsState.calendarEvents as EventSourceInput}
          eventOrder="-start"
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          loading={(state: boolean) => {
            if (loadEventsRef.current)
              loadEventsRef.current.style.display = state ? "block" : "none";
          }}
          initialView={initialView}
          plugins={globalPlugins}
        />
      </Container>
      <p className="text-center mt-2">
        Appointments are only available from 6am to 9pm.
      </p>
    </Responsive>
  );
}

export default FullCalendarScheduling;
