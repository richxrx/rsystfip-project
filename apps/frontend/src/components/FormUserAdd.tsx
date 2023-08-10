import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setDocuments } from '../features/resources/resourcesSlice';
import {
  FormData,
  resetFormDataAdmin,
  setFormData,
} from '../features/users/usersSlice';
import { IDocument } from '../interfaces/IResources';
import { notify } from '../libs/notify';
import * as documentService from '../services/document.service';
import * as userService from '../services/user.service';
import { THandleChangeITS } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';
import Submitter from './Submitter';

function FormUserAdd(): React.ReactNode {
  const formDataState: FormData = useAppSelector(({ users }) => users.formData);
  const documentsState: Array<IDocument> = useAppSelector(
    ({ resources }) => resources.documents,
  );

  const dispatch = useAppDispatch();

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setFormData({
        ...formDataState,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const { mutate, isLoading } = useMutation(userService.saveUser, {
    onSuccess(data) {
      notify(data.ok, {
        type: 'success',
        position: 'top-left',
      });

      dispatch(resetFormDataAdmin());
    },
    onError(error: any) {
      notify(error.response.data.error, { type: 'error' });
    },
  });

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    const payload = formDataState;
    mutate(payload);
  };

  const { data, error } = useQuery<[], any>(
    'documents',
    documentService.getDocuments,
  );

  useEffect(() => {
    if (data) dispatch(setDocuments(data));
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={4}>
          <Form.FloatingLabel label="Rol usuario:">
            <Form.Select
              name="role_id"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.role_id}
              required
            >
              <option value="">No seleccionado</option>
              <option value="2">Rector</option>
              <option value="3">Secretaria</option>
            </Form.Select>
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Nombre:">
            <Form.Control
              name="first_name"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.first_name}
              type="text"
              placeholder="Name"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Apellido:">
            <Form.Control
              name="last_name"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.last_name}
              type="text"
              placeholder="Lastname"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Tipo de Documento:">
            <Form.Select
              name="document_id"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.document_id}
              required
            >
              <option value="">No seleccionado</option>
              {documentsState.map(({ id, document_description }) => (
                <option key={v4()} value={id}>
                  {document_description}
                </option>
              ))}
            </Form.Select>
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Número de documento:">
            <Form.Control
              name="document_number"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.document_number}
              type="number"
              placeholder="Document number"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={10}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Correo institucional:">
            <Form.Control
              name="email"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.email}
              type="email"
              placeholder="Email"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Celular:">
            <Form.Control
              name="phone_number"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.phone_number}
              type="number"
              placeholder="Phone Number"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={10}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Contraseña:">
            <Form.Control
              name="password"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.password}
              type="password"
              placeholder="Password"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Confirmar contraseña:">
            <Form.Control
              name="password2"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.password2}
              type="password"
              placeholder="Password confirm"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Submitter loading={isLoading}>
            {!isLoading ? (
              <>
                Registrar <AddIcon />
              </>
            ) : (
              <Spinner size="sm" />
            )}
          </Submitter>
        </Col>
      </Row>
    </Form>
  );
}

export default FormUserAdd;
