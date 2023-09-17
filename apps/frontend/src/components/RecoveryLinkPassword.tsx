import { Paper, Typography } from '@mui/material';
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
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {dataUserVerified.email}
        </Typography>

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
      </Paper>
    </>
  );
}

export default RecoveryLinkPassword;
