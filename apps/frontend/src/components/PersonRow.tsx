import { FiEdit3 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { People } from '../features/people/peopleSlice';

interface IProps {
  person: People;
}

function PersonRow({
  person: {
    id,
    first_name,
    last_name,
    document_description,
    document_name,
    document_number,
    category_name,
    faculty_name,
    phone_number,
    email,
    visit_subject,
  },
}: IProps): React.ReactNode {
  return (
    <tr>
      <td>{id}</td>
      <td>
        {first_name} {last_name}
      </td>
      <td title={document_description}>
        {document_name} {document_number}
      </td>
      <td>{category_name}</td>
      <td>{faculty_name}</td>
      <td>{phone_number}</td>
      <td>{email}</td>
      <td>{visit_subject}</td>
      <td>
        <Link
          to={`/people/view/${id}/edit`}
          className="btn btn-link link-fc"
          title={`Edit personal data for person ${first_name} ${last_name}`}
        >
          <FiEdit3 />
        </Link>
      </td>
    </tr>
  );
}

export default PersonRow;
