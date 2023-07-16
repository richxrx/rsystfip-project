import {
  FormDataState,
  ProgrammingState,
  formDataInitialState,
  validFormDataAction,
} from "../programmingSlice";

export function updateFormDataByAction(
  state: ProgrammingState,
  action: string,
  formData?: FormDataState
): ProgrammingState {
  if (!(action in validFormDataAction)) return state;

  return {
    ...state,
    formData: {
      ...state.formData,
      [action]: formData || formDataInitialState,
    },
  };
}
