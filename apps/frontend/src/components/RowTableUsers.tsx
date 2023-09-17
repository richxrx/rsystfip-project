import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { useMutation } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { User } from '../features/users/usersSlice';
import { IUserBase } from '../interfaces/IUserBase';
import { notify } from '../libs/notify';
import * as userService from '../services/user.service';

interface IProps {
  user: User;
}

function RowTableUsers({
  user: { id, email, role_name },
}: IProps): React.ReactNode | undefined {
  const { isSuccess, mutate } = useMutation(userService.deleteUser, {
    onSuccess(data) {
      notify(data.ok, { type: 'success', position: 'top-left' });
    },
    onError(error: any) {
      notify(error.response.data.error, { type: 'error' });
    },
  });

  const handleClick = (roleId: IUserBase['id']) => {
    if (!confirm('Seguro(a) de eliminar ese usuario?')) return;
    mutate(roleId);
  };

  if (isSuccess) return;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {email} ({role_name[0].toUpperCase().concat(role_name.slice(1))})
      </TableCell>

      <TableCell align="right">
        <IconButton
          component={RouterLink}
          to={`/users/change-password/${id}`}
          title={`Change password for user ${email}`}
        >
          <KeyIcon />
        </IconButton>

        {/* <IconButton
          component={RouterLink}
          to={`/users/change-password/${id}`}
          title={`Edit data for user ${email}`}
        >
          <EditIcon />
        </IconButton> */}

        <IconButton
          color="error"
          onClick={() => handleClick(id)}
          disabled={id === 3}
          title={`Delete user ${email} (Requires confirmation)`}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default RowTableUsers;
