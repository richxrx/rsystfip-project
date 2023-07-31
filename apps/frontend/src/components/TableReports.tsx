import { Table } from 'react-bootstrap';
import { v4 } from 'uuid';
import { QueryData, Reports } from '../features/reports/reportsSlice';
import { useAppSelector } from '../app/hooks';
import ReportRow from './ReportRow';

function TableReports(): React.ReactNode {
  const reportsState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reports,
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData,
  );

  return (
    <Table responsive hover borderless size="sm" className="text-center">
      <caption>
        Data about people schedule between {queryDataState.start_time} and{' '}
        {queryDataState.end_time}.
      </caption>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Creado en</th>
          <th>Actualizado en</th>
          <th>Agendamiento Inicio - Fin</th>
          <th>Agendamiento Programado</th>
          <th>Agendamiento Diario</th>
          <th>Tipo Persona</th>
        </tr>
      </thead>
      <tbody>
        {reportsState.map((person) => (
          <ReportRow key={v4()} report={person} />
        ))}
      </tbody>
    </Table>
  );
}

export default TableReports;
