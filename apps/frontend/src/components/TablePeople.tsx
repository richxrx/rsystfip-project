import { Table } from "react-bootstrap";
import { v4 } from "uuid";
import { People } from "../features/people/peopleSlice";
import { useAppSelector } from "../hooks";
import PersonRow from "./PersonRow";

function TablePeople(): React.JSX.Element {
  const peopleState: Array<People> = useAppSelector(
    ({ people }) => people.people
  );

  return (
    <Table responsive hover borderless size="sm" className="text-center">
      <caption>Scheduled people history.</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombres</th>
          <th>Identifación</th>
          <th>Categoría</th>
          <th>Facultad</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Asunto de visita a rectoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {peopleState.map((person) => (
          <PersonRow key={v4()} person={person} />
        ))}
      </tbody>
    </Table>
  );
}

export default TablePeople;
