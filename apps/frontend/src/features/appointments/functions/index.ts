import {
  FormDataState,
  AppointmentState,
  formDataInitialState,
  validFormDataAction,
} from '../appointmentsSlice';

export function updateFormDataByAction(
  state: AppointmentState,
  action: string,
  formData?: FormDataState,
): AppointmentState {
  if (!(action in validFormDataAction)) return state;

  return {
    ...state,
    formData: {
      ...state.formData,
      [action]: formData || formDataInitialState,
    },
  };
}
