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
  const [email, setEmail] = useState('');

  const { mutate, isLoading } = useMutation(
    accountService.sendJwtForRecoverPsw,
    {
      onSuccess: () => {
        notify(
          `We will send you an email with instructions to reset your password. The link sended expires in 3 minutes.`,
          { type: 'success' },
        );
        setEmail('');
      },
      onError: (error: any) =>
        notify(error.response.data.error, { type: 'error' }),
    },
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = { email };

    mutate(payload.email);
  };

  const handleChange = (e: THandleChangeI) => setEmail(e.target.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={12}>
          <Form.FloatingLabel label="Email de registro">
            <Form.Control
              name="email"
              className="border-0 bg-white"
              onChange={handleChange}
              value={email}
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

        <Submitter loading={isLoading}>
          {!isLoading ? (
            <>
              Enviar email <BiMailSend className="mb-1" />
            </>
          ) : (
            <Spinner size="sm" />
          )}
        </Submitter>
      </Row>
    </Form>
  );
}

export default FormRecoveryPsw;
