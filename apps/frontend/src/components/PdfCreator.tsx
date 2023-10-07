import { format, parseISO } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import * as pdfMake from 'pdfmake/build/pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { useAppSelector } from '../app/hooks'
import { People } from '../features/people/peopleSlice'
import { QueryData, Reports } from '../features/reports/reportsSlice'
import { ICounts } from '../interfaces/ICounts'
import { createHeader, footer, myFonts, styles } from '../utils/pdfmake'
import Downloader from './Downloader'

function PdfCreator(): React.ReactNode {
  const pngBase64State: string = useAppSelector(
    ({ reports }) => reports.pngBase64
  )
  const reportsState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reports
  )
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  )
  const peopleState: Array<People> = useAppSelector(
    ({ people }) => people.people
  )
  const reportsCountOnRangeState: Array<ICounts> = useAppSelector(
    ({ reports }) => reports.reportsCountOnRange
  )
  const reportsCountAllTimeState: Array<ICounts> = useAppSelector(
    ({ reports }) => reports.reportsCountAllTime
  )

  const documentDefinition: TDocumentDefinitions = {
    pageMargins: [28, 90],
    header: createHeader(
      pngBase64State,
      queryDataState.start_time,
      queryDataState.end_time
    ),
    footer,
    content: [
      {
        text: `Total personas agendadas: (${peopleState.length})`,
        style: 'header',
        alignment: 'center',
        marginBottom: 30
      },
      peopleState.length !== 0
        ? {
            style: 'defaultPage',
            layout: 'lightHorizontalLines',
            alignment: 'center',
            table: {
              dontBreakRows: true,
              headerRows: 1,
              body: [
                [
                  {
                    text: 'No.',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Nombre completo',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Categoría',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Facultad',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Asunto visita rectoría',
                    style: 'tableHeader'
                  }
                ],
                ...peopleState.map(
                  ({
                    id,
                    first_name,
                    last_name,
                    category_name,
                    faculty_name,
                    visit_subject
                  }) => [
                    id,
                    `${first_name} ${last_name}`,
                    category_name,
                    faculty_name,
                    visit_subject
                  ]
                )
              ]
            }
          }
        : [],
      {
        text: `Reportes entre el rango de fecha: (${reportsState.length})`,
        style: 'header',
        alignment: 'center',
        marginBottom: 30,
        pageBreak: 'before'
      },
      reportsState.length !== 0
        ? {
            style: 'defaultPage',
            layout: 'lightHorizontalLines',
            alignment: 'center',
            table: {
              dontBreakRows: true,
              headerRows: 1,
              body: [
                [
                  {
                    text: 'Nombre completo',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Fecha y hora agendamiento',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Agendamiento diario',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Agendamiento programado',
                    style: 'tableHeader'
                  },
                  {
                    text: 'Cetegoría persona',
                    style: 'tableHeader'
                  }
                ],
                ...reportsState.map(
                  ({
                    first_name,
                    last_name,
                    start_time,
                    scheduling_count,
                    daily_count,
                    category_name
                  }) => [
                    `${first_name} ${last_name}`,
                    format(parseISO(start_time), "MMM d, yyyy 'a las' h:mm a", {
                      locale: esLocale
                    }),
                    scheduling_count,
                    daily_count,
                    category_name
                  ]
                )
              ]
            }
          }
        : [],
      {
        text: 'Cantidad agendado(a)s:',
        style: 'header',
        alignment: 'center',
        marginBottom: 30,
        pageBreak: reportsState.length !== 0 ? 'before' : undefined
      },
      {
        columns: [
          {
            text: `Rango de fecha${
              reportsCountOnRangeState.length !== 0 ? '' : ' (0)'
            }`,
            style: 'subheader',
            alignment: 'center',
            marginBottom: 10
          },
          {
            text: `Cantidad total${
              reportsCountAllTimeState.length !== 0 ? '' : ' (0)'
            }`,
            style: 'subheader',
            alignment: 'center',
            marginBottom: 10
          }
        ]
      },
      {
        columns: [
          reportsCountOnRangeState.length !== 0
            ? {
                layout: 'headerLineOnly',
                alignment: 'center',
                marginBottom: 30,
                style: 'defaultPage',
                table: {
                  dontBreakRows: true,
                  headerRows: 1,
                  body: [
                    [
                      {
                        text: 'Categoría de persona',
                        style: 'tableHeader'
                      },
                      {
                        text: 'Cantidad personas',
                        style: 'tableHeader'
                      }
                    ],
                    ...reportsCountOnRangeState.map(
                      ({ category_name, counts }) => [category_name, counts]
                    )
                  ]
                }
              }
            : [],
          reportsCountAllTimeState.length !== 0
            ? {
                layout: 'headerLineOnly',
                alignment: 'center',
                marginBottom: 30,
                style: 'defaultPage',
                table: {
                  dontBreakRows: true,
                  headerRows: 1,
                  body: [
                    [
                      {
                        text: 'Categoría de persona',
                        style: 'tableHeader'
                      },
                      {
                        text: 'Cantidad personas',
                        style: 'tableHeader'
                      }
                    ],
                    ...reportsCountAllTimeState.map(
                      ({ category_name, counts }) => [category_name, counts]
                    )
                  ]
                }
              }
            : []
        ]
      }
    ],
    styles
  }

  const pdf: pdfMake.TCreatedPdf = pdfMake.createPdf(
    documentDefinition,
    undefined,
    myFonts
  )

  return <Downloader pdf={pdf} />
}

export default PdfCreator
