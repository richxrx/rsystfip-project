import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import {
  PeopleCancellation,
  setCancelledPeople,
} from '../features/cancellations/cancellationsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { notify } from '../libs/toast';
import * as peopleService from '../services/people.service';
import CancelledRow from './CancelledRow';

function TableCancelled(): React.ReactNode {
  const dispatch = useAppDispatch();

  const cancelledPeopleState: Array<PeopleCancellation> = useAppSelector(
    ({ cancellation }) => cancellation,
  );

  const { data, error } = useQuery<[], any>(
    'peopleCancelled',
    peopleService.getPeopleCancelled,
  );

  useEffect(() => {
    if (data) dispatch(setCancelledPeople(data));
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <Table responsive hover borderless size="sm" className="text-center">
      <caption>Cancelled people history.</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombre Completo</th>
          <th>Identifación</th>
          <th>Categoría</th>
          <th>Facultad</th>
          <th>Motivo cancelación</th>
        </tr>
      </thead>
      <tbody>
        {cancelledPeopleState.map((person, index) => (
          <CancelledRow key={v4()} index={index} person={person} />
        ))}
      </tbody>
    </Table>
  );
}

export default TableCancelled;
