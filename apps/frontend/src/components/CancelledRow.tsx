import { PeopleCancelled } from "../features/cancelledPeople/cancelledPeopleSlice";

interface IProps {
  index: number;
  person: PeopleCancelled;
}

function CancelledRow({
  index,
  person: {
    first_name,
    last_name,
    document_description,
    document_name,
    document_number,
    category_name,
    faculty_name,
    cancellation_subject,
  },
}: IProps): React.ReactNode {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {first_name} {last_name}
      </td>
      <td title={document_description}>
        {document_name} {document_number}
      </td>
      <td>{category_name}</td>
      <td>{faculty_name}</td>
      <td>{cancellation_subject}</td>
    </tr>
  );
}

export default CancelledRow;
