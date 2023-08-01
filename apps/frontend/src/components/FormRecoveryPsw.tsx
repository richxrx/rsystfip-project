import { useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { BiMailSend } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { notify } from '../libs/toast';
import * as accountService from '../services/account.service';
import { THandleChangeI } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';
import Submitter from './Submitter';

function FormRecoveryPsw(): React.ReactNode {
  const formDataInitialState = { email: '' };
  const [formData, setFormData] = useState(formDataInitialState);

  const { mutate, isLoading } = useMutation(
    accountService.sendJwtForRecoverPsw,
    {
      onSuccess: () => {
        notify(
          `We will send you an email with instructions to reset your password. The link sended expires in 3 minutes.`,
          { type: 'success' },
        );

        setFormData(formDataInitialState);
      },
      onError: (error: any) =>
        notify(error.response.data.error, { type: 'error' }),
    },
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = formData;

    mutate(payload.email);
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
            <Form.FloatingLabel label="Email de registro">
              <Form.Control
                name="email"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formData.email}
                type="email"
                placeholder="Email"
                autoComplete="off"
                spellCheck={false}
                minLength={10}
                maxLength={30}
                autoFocus
                required
              />
            </Form.FloatingLabel>
          </Col>

          <Col md={6}>
            <Submitter loading={isLoading}>
              {!isLoading ? (
                <>
                  Enviar <BiMailSend className="mb-1" />
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

export default FormRecoveryPsw;
