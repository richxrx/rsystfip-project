import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { notify } from '../libs/notify';
import * as accountService from '../services/account.service';
import { THandleChangeI } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';
import Submitter from './Submitter';

function FormChangePswForget(): React.ReactNode {
  const formDataInitialState = { password: '', password2: '' };
  const [formData, setFormData] = useState(formDataInitialState);
  const { resetToken } = useParams<{ resetToken: string }>();

  const { mutate, isLoading } = useMutation(
    accountService.changePasswordWithJwt,
    {
      onSuccess(data) {
        notify(data.ok, {
          type: 'success',
          position: 'top-left',
        });

        setFormData(formDataInitialState);
      },
      onError(error: any) {
        notify(error.response.data.error, { type: 'error' });
      },
    },
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      resetToken,
      password: formData.password,
      password2: formData.password2,
    };

    mutate(payload);
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Col md={2} className="mx-auto">
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={12}>
            <Form.FloatingLabel label="Contraseña nueva:">
              <Form.Control
                name="password"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder="New password"
                autoComplete="off"
                spellCheck={false}
                minLength={8}
                maxLength={30}
                autoFocus
                required
              />
            </Form.FloatingLabel>
          </Col>

          <Col md={12}>
            <Form.FloatingLabel label="Confirmar contraseña nueva:">
              <Form.Control
                name="password2"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formData.password2}
                type="password"
                placeholder="Confirm new password"
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
                  Continuar <KeyIcon />
                </>
              ) : (
                <Spinner size="sm" />
              )}
            </Submitter>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default FormChangePswForget;
