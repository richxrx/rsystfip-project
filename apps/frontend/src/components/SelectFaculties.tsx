import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { v4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { FormDataState } from '../features/appointments/appointmentsSlice'
import { setFaculties } from '../features/resources/resourcesSlice'
import { IFacultie } from '../interfaces/IResources'
import { notify } from '../libs/notify'
import * as facultieService from '../services/facultie.service'
import { actionFormSchedule } from './FormSchedulePeople'

interface IProps {
  action: actionFormSchedule
  handleChange: (e: SelectChangeEvent) => void
  facultieSelectRef: React.RefObject<HTMLSelectElement>
}

function SelectFaculties({
  action,
  handleChange,
  facultieSelectRef
}: IProps): React.ReactNode {
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  )
  const facultiesState: Array<IFacultie> = useAppSelector(
    ({ resources }) => resources.faculties
  )

  const dispatch = useAppDispatch()

  const { data, error } = useQuery<[], any>(
    'faculties',
    facultieService.getFaculties
  )

  useEffect(() => {
    if (data) dispatch(setFaculties(data))
    if (error) notify(error.response.data.error, { type: 'error' })
  }, [data, error])

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Faculty</InputLabel>

      <Select
        name="faculty_id"
        label="Faculty"
        value={formDataState.faculty_id}
        onChange={handleChange}
        ref={facultieSelectRef}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
        }
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {facultiesState.map(({ id, faculty_name }) => (
          <MenuItem key={v4()} value={id.toString()}>
            {faculty_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectFaculties
