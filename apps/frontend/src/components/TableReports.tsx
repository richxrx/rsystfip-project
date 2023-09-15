import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import format from 'date-fns/format';
import esLocale from 'date-fns/locale/es';
import parseISO from 'date-fns/parseISO';
import { useAppSelector } from '../app/hooks';
import { Reports } from '../features/reports/reportsSlice';
import { createColumn } from '../libs/utils';

interface IProps {
  isLoading: boolean;
}

const columns: GridColDef[] = [
  createColumn('id', 'ID', 70),
  {
    ...createColumn('full_name', 'Full name', 250),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
  {
    ...createColumn('created_at', 'Created at', 200),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      format(parseISO(params.row.created_at), "MMM d, yyyy 'a las' h:mm a", {
        locale: esLocale,
      }),
  },
  {
    ...createColumn('updated_at', 'Updated at', 200),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      format(parseISO(params.row.updated_at), "MMM d, yyyy 'a las' h:mm a", {
        locale: esLocale,
      }),
  },
  {
    ...createColumn('appointment_date', 'Appointment date', 380),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${format(parseISO(params.row.start_time), "MMM d, yyyy 'a las' h:mm a", {
        locale: esLocale,
      })}${' - '}
    ${format(parseISO(params.row.start_time), "MMM d, yyyy 'a las' h:mm a", {
      locale: esLocale,
    })}`,
  },
  createColumn('scheduling_count', 'Scheduling count', 130),
  createColumn('daily_count', 'Daily count', 90),
  createColumn('category_name', 'Category name', 160),
];

function TableReports({ isLoading }: IProps): React.ReactNode {
  const reportsState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reports,
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Paper>
        <DataGrid
          rows={reportsState}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          loading={isLoading}
          sx={{ border: 'none' }}
        />
      </Paper>
    </div>
  );
}

export default TableReports;
