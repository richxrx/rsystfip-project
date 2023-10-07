import { memo } from 'react'
import { useAppSelector } from '../app/hooks'
import { AppointmentStatus } from '../features/appointments/appointmentsSlice'
import { QueryData } from '../features/statistics/statisticsSlice'
import { ICounts } from '../interfaces/ICounts'
import Listgroup from './ui/Listgroup'

interface IProps {
  appointment_status: AppointmentStatus
}

function ListerStatistics({ appointment_status }: IProps): React.ReactNode {
  const mostAgendatedOnRangeState: Array<ICounts> = useAppSelector(
    ({ statistics }) => statistics[appointment_status].mostAgendatedOnRange
  )
  const mostAgendatedAllTimeState: Array<ICounts> = useAppSelector(
    ({ statistics }) => statistics[appointment_status].mostAgendatedAllTime
  )
  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  )

  const titleText: string =
    appointment_status === AppointmentStatus.daily ? 'diario' : 'programado'

  return (
    <>
      <Listgroup
        title={`Agendamiento ${titleText} en el rango de fecha`}
        data={mostAgendatedOnRangeState}
        end_time={queryDataState.end_time}
      />

      <Listgroup
        title={`Agendamiento ${titleText} en todas las fechas`}
        data={mostAgendatedAllTimeState}
        end_time={queryDataState.end_time}
      />
    </>
  )
}

export default memo(ListerStatistics)
