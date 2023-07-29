import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { FormDataState } from "../features/appointments/appointmentsSlice";
import { setDocuments } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IDocument } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import { actionFormSchedule } from "./FormSchedulePeople";
import * as documentService from "../services/document.service";

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectDocument({ action, handleChange }: IProps): React.ReactNode {
  const documentsState: Array<IDocument> = useAppSelector(
    ({ resources }) => resources.documents
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  );

  const dispatch = useAppDispatch();

  const { data, error } = useQuery<[], any>(
    "documents",
    documentService.getDocuments
  );

  useEffect(() => {
    if (data) dispatch(setDocuments(data));
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <FloatingLabel label="Tipo de Documento:">
      <FormSelect
        name="document_id"
        className="border-0 bg-white"
        onChange={handleChange}
        value={formDataState.document_id}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
        }
        required
      >
        <option value="">No seleccionado</option>
        {documentsState.map(({ id, document_description }) => (
          <option key={v4()} value={id}>
            {document_description}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
}

export default SelectDocument;
