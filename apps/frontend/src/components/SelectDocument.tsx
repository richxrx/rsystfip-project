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
import { setDocuments } from '../features/resources/resourcesSlice'
import { IDocument } from '../interfaces/IResources'
import { notify } from '../libs/notify'
import * as documentService from '../services/document.service'
import { actionFormSchedule } from './FormSchedulePeople'

interface IProps {
  action: actionFormSchedule
  handleChange: (e: SelectChangeEvent) => void
}

function SelectDocument({ action, handleChange }: IProps): React.ReactNode {
  const documentsState: Array<IDocument> = useAppSelector(
    ({ resources }) => resources.documents
  )
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  )

  const dispatch = useAppDispatch()

  const { data, error } = useQuery<[], any>(
    'documents',
    documentService.getDocuments
  )

  useEffect(() => {
    if (data) dispatch(setDocuments(data))
    if (error) notify(error.response.data.error, { type: 'error' })
  }, [data, error])

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Document</InputLabel>

      <Select
        name="document_id"
        label="Document"
        value={formDataState.document_id}
        onChange={handleChange}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
        }
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {documentsState.map(({ id, document_description }) => (
          <MenuItem key={v4()} value={id.toString()}>
            {document_description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectDocument
