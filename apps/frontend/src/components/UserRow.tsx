import { Button } from 'react-bootstrap';
import { BiKey, BiTrash } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { User } from '../features/users/usersSlice';
import { IUserBase } from '../interfaces/IUserBase';
import { notify } from '../libs/notify';
import * as userService from '../services/user.service';
import { FiEdit3 } from 'react-icons/fi';

interface IProps {
  user: User;
}

function UserRow({
  user: { id, email, first_name, last_name, role_name },
}: IProps): React.ReactNode | undefined {
  const { isSuccess, mutate } = useMutation(userService.deleteUser, {
    onSuccess: (data) =>
      notify(data.ok, { type: 'success', position: 'top-left' }),
    onError: (error: any) =>
      notify(error.response.data.error, { type: 'error' }),
  });

  const handleClick = (roleId: IUserBase['id']) => {
    if (!confirm('Seguro(a) de eliminar ese usuario?')) return;
    mutate(roleId);
  };

  if (isSuccess) return;

  return (
    <tr>
      <td>
        {email} ({role_name[0].toUpperCase().concat(role_name.slice(1))})
      </td>

      <td>
        <Link
          to={`/users/change-password/${id}`}
          className="btn btn-light m-1"
          title={`Change password for user ${email}`}
        >
          <BiKey />
        </Link>

        <Link
          to={`/users/change-password/${id}`}
          className="btn btn-light m-1"
          title={`Edit data for user ${first_name} ${last_name}`}
        >
          <FiEdit3 />
        </Link>

        <Button
          onClick={() => handleClick(id)}
          variant="danger"
          className={'m-1'.concat(id !== 3 ? '' : ' disabled')}
          title={`Delete user ${email} (Requires confirmation)`}
        >
          <BiTrash />
        </Button>
      </td>
    </tr>
  );
}

export default UserRow;
