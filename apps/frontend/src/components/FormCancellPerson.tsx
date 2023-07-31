import { useState } from 'react';
import { Button, Col, Form, ModalFooter, Row, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { registerAChange } from '../features/calendar/calendarSlice';
import { FormDataState } from '../features/appointments/appointmentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { notify } from '../libs/toast';
import * as cancellationService from '../services/cancellation.service';
import * as scheduleService from '../services/schedule.service';
import * as sgService from '../services/sendgrid.service';
import { THandleChangeI } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';

interface IProps {
  closeModalCancell: () => void;
}

function FormCancellPerson({ closeModalCancell }: IProps): React.ReactNode {
  const [cancellationSubject, setCancellationSubject] = useState('');

  const dispatch = useAppDispatch();

  const formDataState: FormDataState = useAppSelector(
    ({ appointments }) => appointments.formData.schedule,
  );

  const mutationCancellation = useMutation(
    cancellationService.createCancellation,
  );
  const mutationSendEmail = useMutation(sgService.sendEmail);
  const mutationSchedule = useMutation(scheduleService.cancellSchedule);

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();

    const payload = {
      person_id: formDataState.id,
      cancellation_subject: cancellationSubject,
    };

    try {
      // person_id is same to formData.id
      const resSchedule = await mutationSchedule.mutateAsync(
        +payload.person_id,
      );
      notify(resSchedule.ok, {
        type: 'info',
        position: 'top-left',
      });

      const resCancellation = await mutationCancellation.mutateAsync(payload);
      notify(resCancellation.ok, {
        type: 'info',
        position: 'top-left',
      });

      const sgPayload = {
        email: resSchedule.scheduleCancelled.email,
        subject: 'Schedule cancelled',
        html: `<strong>${resSchedule.scheduleCancelled.first_name} ${resSchedule.scheduleCancelled.last_name}</strong>, your schedule cite for the day <code>${resSchedule.scheduleCancelled.start_time} has been cancelled. The reason of cancellation is: <code>${payload.cancellation_subject}</code>.</br><img src='https://repositorio.itfip.edu.co/themes/Mirage2/images/logo_wh.png'>`,
      };
      const resSendgrid = await mutationSendEmail.mutateAsync(sgPayload);
      notify(resSendgrid.ok, {
        type: 'success',
        position: 'top-left',
      });

      dispatch(registerAChange());
      setCancellationSubject('');
      closeModalCancell();
    } catch (error: any) {
      notify(error.response.data.error, { type: 'error' });
    }
  };

  const handleChange = (e: THandleChangeI) =>
    setCancellationSubject(e.target.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3 my-2">
        <Col md={12}>
          <Form.FloatingLabel label="Asunto cancelamiento:">
            <Form.Control
              as="textarea"
              name="cancellation_subject"
              className="border-0 bg-white"
              onChange={handleChange}
              value={cancellationSubject}
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={150}
              style={{ height: '100px' }}
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>
        <ModalFooter>
          <Button onClick={closeModalCancell} variant="light">
            No <FaTimes className="mb-1" />
          </Button>
          <Button
            variant="danger"
            disabled={
              mutationCancellation.isLoading ||
              mutationSchedule.isLoading ||
              mutationSendEmail.isLoading
            }
            type="submit"
          >
            {!(
              mutationCancellation.isLoading ||
              mutationSchedule.isLoading ||
              mutationSendEmail.isLoading
            ) ? (
              <>
                Sí, cancelar <FaCheck className="mb-1" />
              </>
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
        </ModalFooter>
      </Row>
    </Form>
  );
}

export default FormCancellPerson;
