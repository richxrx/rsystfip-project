import { useEffect, useRef } from 'react';
import { Button, Col, Form, ModalFooter, Row, Spinner } from 'react-bootstrap';
import { GiReturnArrow } from 'react-icons/gi';
import { IoCalendarNumber } from 'react-icons/io5';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { registerAChange } from '../features/calendar/calendarSlice';
import {
  Deans,
  FormDataState,
  AppointmentStatus,
  setFormData,
} from '../features/appointments/appointmentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { notify } from '../libs/toast';
import * as deanService from '../services/dean.service';
import * as peopleService from '../services/people.service';
import * as scheduleService from '../services/schedule.service';
import { THandleChangeITS } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';
import FooterFormPeople from './FooterFormPeople';
import ProtectedElement from './ProtectedElement';
import SelectDocument from './SelectDocument';
import SelectFaculties from './SelectFaculties';
import SelectPerson from './SelectPerson';
import SmallCaption from './SmallCaption';

export enum propsAction {
  add = 'add',
  edit = 'edit',
  schedule = 'schedule',
}

interface IProps {
  action: propsAction;
  closeModalScheduling?: () => void;
}

export type actionFormSchedule = IProps['action'];

function FormSchedulePeople({
  action,
  closeModalScheduling,
}: IProps): React.ReactNode {
  const { id } = useParams<{ id: string }>();

  const facultieSelectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const formDataState: FormDataState = useAppSelector(
    ({ appointments: { formData } }) => formData[action],
  );

  const deansState: Array<Deans> = useAppSelector(
    ({ appointments }) => appointments.deans,
  );

  const mutationEditPerson = useMutation(peopleService.editPeople, {
    onSuccess: (data) => {
      dispatch(setFormData([action]));

      notify(data.ok, {
        type: 'success',
        position: 'top-left',
      });
    },
    onError: (error: any) =>
      notify(error.response.data.error, { type: 'error' }),
  });
  const mutationSavePeople = useMutation(peopleService.savePeople);
  const mutationSchedule = useMutation(scheduleService.saveSchedule);
  const mutationSaveDean = useMutation(deanService.saveDean);

  const editPerson = () => {
    const payload = {
      id,
      category_id: formDataState.category_id,
      first_name: formDataState.first_name,
      last_name: formDataState.last_name,
      document_id: formDataState.document_id,
      document_number: formDataState.document_number,
      faculty_id: formDataState.faculty_id,
      email: formDataState.email,
      phone_number: formDataState.phone_number,
    };

    mutationEditPerson.mutate(payload);
  };

  const schedulePerson = async (
    closeModalScheduling?: IProps['closeModalScheduling'],
  ): Promise<void> => {
    const payload = {
      category_id: formDataState.category_id,
      first_name: formDataState.first_name,
      last_name: formDataState.last_name,
      document_id: formDataState.document_id,
      document_number: formDataState.document_number,
      email: formDataState.email,
      phone_number: formDataState.phone_number,
      faculty_id: formDataState.faculty_id,
      visit_subject: formDataState.visit_subject,
      color: formDataState.color,
      start_time: formDataState.start_time,
      end_time: formDataState.end_time,
      status: formDataState.status,
    };

    try {
      const resSavePeople = await mutationSavePeople.mutateAsync(payload);
      notify(resSavePeople.ok, {
        type: 'info',
        position: 'top-left',
      });

      if (payload.category_id === '4') {
        const resDean = await mutationSaveDean.mutateAsync({
          id: payload.document_number,
          first_name: payload.first_name,
          last_name: payload.last_name,
          faculty_id: payload.faculty_id,
        });
        notify(resDean.ok, {
          type: 'info',
          position: 'top-left',
        });
      }

      const resSchedule = await mutationSchedule.mutateAsync({
        person_id: resSavePeople.personCreated.id.toString(),
        start_time: payload.start_time || undefined,
        end_time: payload.end_time || undefined,
        visit_subject: payload.visit_subject,
        status: payload.status,
        color: payload.color,
      });
      notify(resSchedule.ok, {
        type: 'success',
        position: 'top-left',
      });

      // Do the dispatch at redux state
      dispatch(setFormData([action]));

      // Finish the function if status isn't scheduled
      if (
        formDataState.status !== AppointmentStatus.scheduled ||
        !closeModalScheduling
      )
        return;

      dispatch(registerAChange());
      closeModalScheduling();
    } catch (error: any) {
      notify(error.response.data.error, { type: 'error' });
    }
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    switch (action) {
      case propsAction.edit:
        return editPerson();

      case propsAction.schedule:
        return schedulePerson(closeModalScheduling);

      case propsAction.add:
        dispatch(
          setFormData([
            action,
            {
              ...formDataState,
              status: AppointmentStatus.daily,
            },
          ]),
        );
        return schedulePerson();
    }
  };

  const personData = useQuery<any, any>(
    ['personData', id],
    () => peopleService.getData(id as string),
    { enabled: !!id },
  );

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setFormData([
        action,
        { ...formDataState, [e.target.name]: e.target.value },
      ]),
    );
  };

  const autocompleteDeansData = () => {
    if (
      !deansState ||
      formDataState.category_id !== '4' ||
      action === propsAction.edit
    )
      return;

    for (let i = 0; i < deansState.length; i++) {
      const { id, first_name, last_name, faculty_id } = deansState[i];

      if (id !== formDataState.document_number) continue;

      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            document_id: '1',
            first_name,
            last_name,
            faculty_id: faculty_id.toString(),
            disabledAfterAutocomplete: true,
          },
        ]),
      );

      if (facultieSelectRef.current) {
        facultieSelectRef.current.className = 'form-control border-0 bg-white';
      }

      notify('The data deans has been auto-completed', {
        type: 'info',
        position: 'top-left',
      });
    }
  };

  useEffect(() => {
    autocompleteDeansData();
  }, [formDataState.document_number]);

  useEffect(() => {
    const { data, error } = personData;
    if (data)
      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            category_id: data.category_id.toString(),
            document_id: data.document_id.toString(),
            faculty_id: data.faculty_id.toString(),
            first_name: data.first_name,
            last_name: data.last_name,
            document_number: data.document_number,
            phone_number: data.phone_number,
            email: data.email,
          },
        ]),
      );
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [personData.data, personData.error]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={6}>
          <SelectPerson
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Col>

        <Col md={6}>
          <SelectFaculties
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Col>

        <Col md={6}>
          <SelectDocument action={action} handleChange={handleChange} />
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Cédula:">
            <Form.Control
              name="document_number"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.document_number}
              type="number"
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Nombre:">
            <Form.Control
              name="first_name"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.first_name}
              type="text"
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Apellido:">
            <Form.Control
              name="last_name"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.last_name}
              type="text"
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Número de teléfono:">
            <Form.Control
              name="phone_number"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.phone_number}
              type="number"
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={10}
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Email de contacto:">
            <Form.Control
              name="email"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.email}
              type="email"
              placeholder="Complete campo"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={30}
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <ProtectedElement isAllowed={action !== propsAction.edit}>
          <Col md={12}>
            <Form.FloatingLabel label="Asunto:">
              <Form.Control
                as="textarea"
                name="visit_subject"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formDataState.visit_subject}
                placeholder="Complete campo"
                autoComplete="off"
                spellCheck={false}
                minLength={10}
                maxLength={150}
                style={{ height: '100px' }}
                disabled={formDataState.disabledAll}
                required
              />
            </Form.FloatingLabel>
          </Col>
        </ProtectedElement>

        <ProtectedElement isAllowed={action === propsAction.schedule}>
          <Col md={12}>
            <Form.Control
              name="color"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.color}
              type="color"
            />
          </Col>
        </ProtectedElement>

        <SmallCaption />

        <ProtectedElement isAllowed={action !== propsAction.schedule}>
          <FooterFormPeople
            isAllowed={action === propsAction.edit}
            isLoading={
              mutationEditPerson.isLoading ||
              mutationSavePeople.isLoading ||
              mutationSchedule.isLoading ||
              mutationSaveDean.isLoading
            }
          />
        </ProtectedElement>

        <ProtectedElement isAllowed={action === propsAction.schedule}>
          <ModalFooter>
            <Button variant="light" onClick={closeModalScheduling}>
              Cerrar <GiReturnArrow className="mb-1" />
            </Button>
            <Button type="submit">
              {!(
                mutationEditPerson.isLoading ||
                mutationSavePeople.isLoading ||
                mutationSchedule.isLoading ||
                mutationSaveDean.isLoading
              ) ? (
                <>
                  Agendar
                  <IoCalendarNumber className="mb-1" />
                </>
              ) : (
                <Spinner size="sm" />
              )}
            </Button>
          </ModalFooter>
        </ProtectedElement>
      </Row>
    </Form>
  );
}

export default FormSchedulePeople;
