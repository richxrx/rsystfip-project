import { useEffect } from 'react';
import { FloatingLabel, FormSelect } from 'react-bootstrap';
import { UseQueryResult, useQueries } from 'react-query';
import { v4 } from 'uuid';
import { UNSET_STATUS } from '../constants';
import {
  FormDataState,
  setDeans,
  setFormData,
} from '../features/appointments/appointmentsSlice';
import { setCategories } from '../features/resources/resourcesSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ICategory } from '../interfaces/IResources';
import { notify } from '../libs/toast';
import * as categoryService from '../services/category.service';
import * as deanService from '../services/dean.service';
import { actionFormSchedule } from './FormSchedulePeople';

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

function SelectPerson({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.ReactNode {
  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories,
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action],
  );

  const dispatch = useAppDispatch();

  const queries = useQueries([
    { queryKey: 'deans', queryFn: deanService.getDeans, enabled: false },
    { queryKey: 'categories', queryFn: categoryService.getCategories },
  ]);

  useEffect(
    () => {
      for (let i = 0; i < queries.length; i++) {
        const { data, error } = queries[i] as UseQueryResult<any, any>;

        if (data) {
          if (i === 0) {
            dispatch(setDeans(data));
          } else if (i === 1) {
            dispatch(setCategories(data));
          }
        }

        if (error) {
          notify(error.response.data.error, { type: 'error' });
        }
      }
    },
    queries.flatMap(({ data, error }) => [data, error]),
  );

  const inputsInteraction = async () => {
    if (formDataState.category_id === UNSET_STATUS) return;

    dispatch(
      setFormData([
        action,
        {
          ...formDataState,
          disabledAll: false,
          disabledAfterAutocomplete: false,
        },
      ]),
    );

    if (formDataState.category_id === '4') {
      await queries[0].refetch();
    }

    if (facultieSelectRef.current) {
      facultieSelectRef.current.className = 'form-select border-0 bg-white';
      facultieSelectRef.current.disabled = false;
      if (formDataState.category_id === '5')
        facultieSelectRef.current.disabled = true;
    }
  };

  useEffect(() => {
    inputsInteraction();
  }, [formDataState.category_id]);

  return (
    <FloatingLabel label="Persona a registrar:">
      <FormSelect
        name="category_id"
        className="border-0 bg-white"
        onChange={handleChange}
        value={formDataState.category_id}
        required
      >
        <option value="">No seleccionado</option>
        {categoriesState.map(({ id, category_name }) => (
          <option key={v4()} value={id}>
            {category_name}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
}

export default SelectPerson;
