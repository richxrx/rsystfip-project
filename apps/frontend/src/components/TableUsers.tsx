import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import { User, setUsers } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { notify } from '../libs/toast';
import * as userService from '../services/user.service';
import UserRow from './UserRow';

function TableUsers(): React.ReactNode {
  const dispatch = useAppDispatch();

  const usersState: Array<User> = useAppSelector(({ users }) => users.users);

  const { data, error } = useQuery<[], any>('users', userService.getUsers);

  useEffect(() => {
    if (data) dispatch(setUsers(data));
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <Table responsive hover borderless size="sm" className="text-center">
      <caption>Access users.</caption>
      <thead>
        <tr>
          <th>Correo institucional</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usersState.map((user) => (
          <UserRow key={v4()} user={user} />
        ))}
      </tbody>
    </Table>
  );
}

export default TableUsers;
