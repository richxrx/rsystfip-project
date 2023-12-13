import { Box, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import type { FormDataState } from '../features/appointments/appointmentsSlice'
import { registerAChange } from '../features/calendar/calendarSlice'
import { notify } from '../libs/notify'
import * as cancellationService from '../services/cancellation.service'
import * as scheduleService from '../services/schedule.service'
import * as sgService from '../services/sendgrid.service'
import type { THandleChangeI } from '../types/THandleChanges'
import type { THandleSubmit } from '../types/THandleSubmits'

interface IProps {
  closeModalCancell: () => void
  changeIsLoadingCancellPerson: (value: boolean) => void
}

function FormCancellPerson({
  closeModalCancell,
  changeIsLoadingCancellPerson
}: IProps) {
  const formDataInitialState = { cancellation_subject: '' }
  const [formData, setFormData] = useState(formDataInitialState)

  const mutationCancellation = useMutation(
    cancellationService.createCancellation
  )
  const mutationSendEmail = useMutation(sgService.sendEmail)
  const mutationSchedule = useMutation(scheduleService.cancellSchedule)

  const dispatch = useAppDispatch()
  const formDataState: FormDataState = useAppSelector(
    ({ appointments }) => appointments.formData.schedule
  )

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault()

    const payload = {
      person_id: formDataState.id,
      cancellation_subject: formData.cancellation_subject
    }

    try {
      // person_id is same to formData.id
      const resSchedule = await mutationSchedule.mutateAsync(+payload.person_id)
      notify(resSchedule.ok, {
        type: 'info',
        position: 'top-left'
      })

      const resCancellation = await mutationCancellation.mutateAsync(payload)
      notify(resCancellation.ok, {
        type: 'info',
        position: 'top-left'
      })

      const sgPayload = {
        email: resSchedule.scheduleCancelled.email,
        subject: 'Schedule cancelled',
        html: `<strong>${resSchedule.scheduleCancelled.first_name} ${resSchedule.scheduleCancelled.last_name}</strong>, your schedule cite for the day <code>${resSchedule.scheduleCancelled.start_time} has been cancelled. The reason of cancellation is: <code>${payload.cancellation_subject}</code>.</br><img src='https://repositorio.itfip.edu.co/themes/Mirage2/images/logo_wh.png'>`
      }
      const resSendgrid = await mutationSendEmail.mutateAsync(sgPayload)
      notify(resSendgrid.ok, {
        type: 'success',
        position: 'top-left'
      })

      dispatch(registerAChange())
      setFormData(formDataInitialState)
      closeModalCancell()
    } catch (error) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.error, { type: 'error' })
      }
    }
  }

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    changeIsLoadingCancellPerson(
      mutationCancellation.isLoading ||
        mutationSchedule.isLoading ||
        mutationSendEmail.isLoading
    )
  }, [
    mutationCancellation.isLoading,
    mutationSchedule.isLoading,
    mutationSendEmail.isLoading
  ])

  return (
    <Box component="form" onSubmit={handleSubmit} id="formCancellation">
      <TextField
        margin="dense"
        required
        fullWidth
        variant="standard"
        name="cancellation_subject"
        label="Cancellation subject"
        onChange={handleChange}
        value={formData.cancellation_subject}
        multiline
        rows={4}
        type="text"
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 10, maxLength: 150 }}
        autoFocus
      />
    </Box>
  )
}

export default FormCancellPerson
