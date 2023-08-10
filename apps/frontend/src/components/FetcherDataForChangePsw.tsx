import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTempDataForChangePsw } from '../features/temp/tempSlice';
import { IUserBase } from '../interfaces/IUserBase';
import { notify } from '../libs/notify';
import * as userService from '../services/user.service';
import FormChangePsw from './FormChangePsw';

function FetcherDataForChangePsw(): React.ReactNode {
  const { role } = useParams<{ role: string }>();

  const dispatch = useAppDispatch();

  const tempDataStateForChangePsw: IUserBase = useAppSelector(
    ({ temp }) => temp.tempDataForChangePsw,
  );

  const { data, error } = useQuery<any, any>(['userData', role], () =>
    userService.getData(role as string),
  );

  useEffect(() => {
    if (data) dispatch(setTempDataForChangePsw(data));
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <>
      <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        >
          {tempDataStateForChangePsw.email}
        </Typography>

        <Card.Body className="my-4">
          <FormChangePsw userId={tempDataStateForChangePsw.id} />
        </Card.Body>
      </Card>
    </>
  );
}

export default FetcherDataForChangePsw;
