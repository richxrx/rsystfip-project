import { useEffect } from 'react'
import { useQueries, type UseQueryResult } from 'react-query'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setPeople } from '../features/people/peopleSlice'
import {
  setPngBase64,
  setReportsCountAllTime,
  setReportsCountOnRange,
  type QueryData
} from '../features/reports/reportsSlice'
import { notify } from '../libs/notify'
import * as peopleService from '../services/people.service'
import * as reportService from '../services/report.service'
import * as resService from '../services/res.service'
import PdfCreator from './PdfCreator'

function FetcherReports(): React.ReactNode {
  const dispatch = useAppDispatch()

  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  )

  const queries = useQueries([
    {
      queryKey: 'people',
      queryFn: peopleService.getPeople,
      refetchOnWindowFocus: false
    },
    {
      queryKey: 'reportsAllTime',
      queryFn: reportService.getReportsCountAlltime,
      refetchOnWindowFocus: false
    },
    {
      queryKey: [
        'reportsOnRange',
        queryDataState.start_time,
        queryDataState.end_time
      ],
      queryFn: () => reportService.getReportsCountOnRange(queryDataState),
      refetchOnWindowFocus: false
    },
    {
      queryKey: 'pngBase64',
      queryFn: resService.getPngbase64,
      refetchOnWindowFocus: false
    }
  ])

  useEffect(
    () => {
      for (let i = 0; i < queries.length; i++) {
        const { data, error } = queries[i] as UseQueryResult<any, any>

        if (data) {
          if (i === 0) {
            dispatch(setPeople(data))
          } else if (i === 1) {
            dispatch(setReportsCountAllTime(data))
          } else if (i === 2) {
            dispatch(setReportsCountOnRange(data))
          } else if (i === 3) {
            const reader = new FileReader()
            reader.readAsDataURL(data)
            reader.addEventListener('load', () => {
              if (
                reader.result &&
                typeof reader.result === 'string' &&
                reader.result.length > 0
              ) {
                dispatch(setPngBase64(reader.result))
              }
            })
          }
        }

        if (error) {
          notify(error.response.data.error, { type: 'error' })
        }
      }
    },
    queries.flatMap(({ data, error }) => [data, error])
  )

  return <PdfCreator />
}

export default FetcherReports
