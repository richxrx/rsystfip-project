import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { v4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { AppointmentStatus } from '../features/appointments/appointmentsSlice'
import { QueryData, setQueryData } from '../features/statistics/statisticsSlice'

interface IProps {
  appointment_status: AppointmentStatus
}

function DaterStatistics({ appointment_status }: IProps): React.ReactNode {
  const dispatch = useAppDispatch()

  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  )

  const handleChangeSelect = (e: SelectChangeEvent) => {
    dispatch(
      setQueryData([
        appointment_status,
        {
          ...queryDataState,
          [e.target.name]: e.target.value
        }
      ])
    )
  }

  const handleChangeDatePicker = (name: string, value: Date) => {
    dispatch(
      setQueryData([
        appointment_status,
        {
          ...queryDataState,
          [name]: format(value, 'yyyy-MM-dd')
        }
      ])
    )
  }

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
                handleChangeDatePicker('start_time', value as Date)
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
                handleChangeDatePicker('end_time', value as Date)
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Chart type</InputLabel>

            <Select
              name="chart_type"
              label="Chart type"
              value={queryDataState.chart_type}
              onChange={handleChangeSelect}
            >
              {queryDataState.chart_types.map((chart_type) => (
                <MenuItem key={v4()} value={chart_type}>
                  {chart_type[0].toUpperCase().concat(chart_type.slice(1))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default DaterStatistics
