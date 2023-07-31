import { Reports } from '../features/reports/reportsSlice';

interface IProps {
  report: Reports;
}

function ReportRow({
  report: {
    first_name,
    last_name,
    created_at,
    updated_at,
    start_time,
    end_time,
    scheduling_count,
    daily_count,
    category_name,
  },
}: IProps): React.ReactNode {
  return (
    <tr>
      <td>
        {first_name} {last_name}
      </td>
      <td>{new Date(created_at).toLocaleString()}</td>
      <td>{new Date(updated_at).toLocaleString()}</td>
      <td>
        {new Date(start_time).toLocaleString()}
        {' - '}
        {new Date(end_time).toLocaleString()}
      </td>
      <td>{scheduling_count}</td>
      <td>{daily_count}</td>
      <td>{category_name}</td>
    </tr>
  );
}

export default ReportRow;
