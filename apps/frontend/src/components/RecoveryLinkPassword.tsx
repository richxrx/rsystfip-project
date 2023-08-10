import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { notify } from '../libs/notify';
import * as accountService from '../services/account.service';
import FormChangePswForget from './FormChangePswForget';
import ResetTokenInvalid from './ResetTokenInvalid';

function RecoveryLinkPassword(): React.ReactNode {
  const { resetToken } = useParams<{ resetToken: string }>();

  const [dataUserVerified, setDataUserVerified] = useState({
    tokenIsValid: false,
    email: '',
  });

  const { data, isLoading, error } = useQuery<any, any>(
    'verifyJwtForRecoverPsw',
    () => accountService.verifyJwtForRecoverPsw(resetToken as string),
  );

  useEffect(() => {
    if (data) setDataUserVerified(data);
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <>
      <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
        <Col md={4} className="mx-auto">
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
          >
            Recuperacion de contraseña {dataUserVerified.email}
          </Typography>
        </Col>

        <Card.Body className="my-4">
          {!isLoading ? (
            dataUserVerified.tokenIsValid ? (
              <FormChangePswForget />
            ) : (
              <ResetTokenInvalid />
            )
          ) : (
            <Container className="text-center">
              <Spinner className="my-5" />
            </Container>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default RecoveryLinkPassword;
