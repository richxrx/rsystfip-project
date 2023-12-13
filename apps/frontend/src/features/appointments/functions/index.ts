import {
  formDataInitialState,
  validFormDataAction,
  type AppointmentState,
  type FormDataState
} from '../appointmentsSlice'

export const updateFormDataByAction = (
  state: AppointmentState,
  action: string,
  formData?: FormDataState
): AppointmentState => {
  if (!(action in validFormDataAction)) return state

  return {
    ...state,
    formData: {
      ...state.formData,
      [action]: formData || formDataInitialState
    }
  }
}
