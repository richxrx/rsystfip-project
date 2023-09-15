import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { useEffect } from 'react';
import { UseQueryResult, useQueries } from 'react-query';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  QueryData,
  Reports,
  setQueryData,
  setReports,
  setReportsOrigen,
} from '../features/reports/reportsSlice';
import { setCategories } from '../features/resources/resourcesSlice';
import { ICategory } from '../interfaces/IResources';
import { notify } from '../libs/notify';
import * as categoryService from '../services/category.service';
import * as reportService from '../services/report.service';
import FetcherReports from './FetcherReports';
import TableReports from './TableReports';

function Reports(): React.ReactNode {
  const dispatch = useAppDispatch();

  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories,
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData,
  );
  const reportsOrigenState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reportsOrigen,
  );

  const handleChangeSelect = (e: SelectChangeEvent) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleChangeDatePicker = (name: string, value: Date) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [name]: format(value, 'yyyy-MM-dd'),
      }),
    );
  };

  const queries = useQueries([
    {
      queryKey: 'categories',
      queryFn: categoryService.getCategories,
    },
    {
      queryKey: ['reports', queryDataState.start_time, queryDataState.end_time],
      queryFn: () => reportService.getReports(queryDataState),
    },
  ]);

  const filterReports = (dataToFilter = reportsOrigenState) => {
    dispatch(
      setReports(
        queryDataState.category_id
          ? dataToFilter.filter(
              ({ category_id }) =>
                category_id.toString() ===
                queryDataState.category_id.toString(),
            )
          : dataToFilter,
      ),
    );
  };

  useEffect(
    () => {
      for (let i = 0; i < queries.length; i++) {
        const { data, error } = queries[i] as UseQueryResult<any, any>;

        if (data) {
          if (i === 0) {
            dispatch(setCategories(data));
          }
          if (i === 1) {
            filterReports(data);
            dispatch(setReportsOrigen(data));
          }
        }

        if (error) {
          notify(error.response.data.error, { type: 'error' });
        }
      }
    },
    queries.flatMap(({ data, error }) => [data, error]),
  );

  useEffect(() => {
    filterReports();
  }, [queryDataState.category_id]);

  return (
    <>
      <Grid
        container
        spacing={2}
        marginY={{ xs: '1rem', sm: '2rem', md: '3rem' }}
        alignItems="center"
      >
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start time"
              value={parse(queryDataState.start_time, 'yyyy-MM-dd', new Date())}
              onChange={(value) => {
                handleChangeDatePicker('start_time', value as Date);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End time"
              value={parse(queryDataState.end_time, 'yyyy-MM-dd', new Date())}
              onChange={(value) => {
                handleChangeDatePicker('end_time', value as Date);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>

            <Select
              name="category_id"
              label="Category"
              value={queryDataState.category_id}
              onChange={handleChangeSelect}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>

              {categoriesState.map(({ id, category_name }) => (
                <MenuItem key={v4()} value={id}>
                  {category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FetcherReports />

      <TableReports isLoading={queries[1].isLoading} />
    </>
  );
}

export default Reports;
