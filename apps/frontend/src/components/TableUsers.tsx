import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { v4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { User, setUsers } from '../features/users/usersSlice'
import { notify } from '../libs/notify'
import * as userService from '../services/user.service'
import RowTableUsers from './ui/RowTableUsers'

function TableUsers(): React.ReactNode {
  const dispatch = useAppDispatch()

  const usersState: Array<User> = useAppSelector(({ users }) => users.users)

  const { data, error } = useQuery<[], any>('users', userService.getUsers)

  useEffect(() => {
    if (data) dispatch(setUsers(data))
    if (error) notify(error.response.data.error, { type: 'error' })
  }, [data, error])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Institutional Itfip Email</TableCell>

            <TableCell width={170} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {usersState.map((user) => (
            <RowTableUsers key={v4()} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableUsers
