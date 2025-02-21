import {
  LinkWrapper,
  Pill,
  SortOrder,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@ama-pt/agora-design-system'
import { AnyNode } from 'postcss'
import React, { useMemo, useState } from 'react'

import './style.css'

const ESTADOS = {
  Concluído: 'neutral',
  Entregue: 'success',
  'Em andamento': 'warning',
}

const DUMMY_DATA: Array<any> = [
  {
    'header-1': 0,
    'header-2': 'Mon Jan 29 2024 17:04:30 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '2a7d90e8-75d7-4717-a748-b872adbd5e6b',
    'header-4': '80ed6bcb-3e28-4f18-b20e-6f8b2c1aa603',
    'header-5': 'ae4dd5d9-4329-489b-998e-2ea175f3bb21',
  },
  {
    'header-1': 1,
    'header-2': 'Fri Jan 05 2024 00:05:05 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '86ea7890-f16c-4945-a50d-bdfedf84aac4',
    'header-4': '6e126864-9d0c-4466-9aad-f56cda321469',
    'header-5': 'bdc1159b-bb32-4c0d-86b5-db0c1f160b23',
  },
  {
    'header-1': 2,
    'header-2': 'Tue Jan 16 2024 15:18:05 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': 'ae223f48-3dfe-46d4-8eb3-ef88cf9e404d',
    'header-4': '870068ad-01b6-4f7c-8312-a14bc11fca86',
    'header-5': '94dab6ea-7b42-4d11-bb66-13d9bf01b8db',
  },
  {
    'header-1': 3,
    'header-2': 'Wed Jan 10 2024 09:14:32 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '77f85ef3-4219-4621-8f15-40e5b0a5eba0',
    'header-4': '269465f1-5667-4c98-9445-b33536642d3a',
    'header-5': 'c49db54c-69cf-437f-aedd-ccf75668f130',
  },
  {
    'header-1': 4,
    'header-2': 'Sun Jan 21 2024 23:54:22 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '0ecd011a-b72f-4dac-9ad3-bbe34d84d90a',
    'header-4': '8899022c-04c6-4dd5-bf0d-7621e9a03069',
    'header-5': '47181113-dc29-4928-b82a-d2abba05da3b',
  },
  {
    'header-1': 5,
    'header-2': 'Thu Jan 11 2024 11:16:40 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '50834fa9-7fb8-4381-aaea-ba321a29887e',
    'header-4': '6278cedd-89fe-4790-82d5-77d98bb6bde9',
    'header-5': '5753d747-4e64-4c62-9117-0a7ead999dc4',
  },
  {
    'header-1': 6,
    'header-2': 'Thu Jan 25 2024 12:55:36 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': 'cfcf5c20-8c06-4161-97e5-3f99a66d99d2',
    'header-4': '48ec3452-03e3-4938-b08b-ad9d60f949b0',
    'header-5': '1305b4ca-ed6d-4d22-8733-02167c382ceb',
  },
  {
    'header-1': 7,
    'header-2': 'Sat Jan 20 2024 16:04:24 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '31b49b8a-a7b0-496c-82c8-fcea7ad6f50a',
    'header-4': '8a6c6022-af64-4963-b1bd-96050f944094',
    'header-5': 'acafc048-8829-4963-a07f-e03d70c13fea',
  },
  {
    'header-1': 8,
    'header-2': 'Sun Jan 21 2024 03:44:10 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '249e1ede-3193-446b-b2b3-d1a7ce8ea3c5',
    'header-4': '65b21575-081d-499f-9cae-effa91efa166',
    'header-5': 'f6370be0-4db2-49f0-b97f-e9282e665676',
  },
  {
    'header-1': 9,
    'header-2': 'Thu Jan 18 2024 17:06:09 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '977cf1e7-8632-4a89-91e0-0f239584e3ee',
    'header-4': '3a237dca-f0be-4493-a7b1-88367dce93af',
    'header-5': '5f9c68aa-68ca-4bc9-b1b0-e94947e810f6',
  },
  {
    'header-1': 10,
    'header-2': 'Thu Jan 25 2024 19:36:57 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '98be2ca9-9dc2-4a58-bb1f-4403c5962389',
    'header-4': 'b4f62b2f-dc3a-420a-bdcb-688f47513980',
    'header-5': '810e5607-e4ab-4ffc-aad0-3b02ec0674cb',
  },
  {
    'header-1': 11,
    'header-2': 'Wed Jan 10 2024 04:58:04 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '050270a4-d383-431e-877b-bb2f703be51b',
    'header-4': 'e80b3af6-8450-49fd-9f20-0cc5e302b77b',
    'header-5': '310d5c6a-f303-4937-b5ab-ae033280d11b',
  },
  {
    'header-1': 12,
    'header-2': 'Fri Jan 05 2024 13:41:23 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '52c26899-3f09-49d9-b42a-deb8e954ead0',
    'header-4': '00c707f3-19b0-4b76-9459-f3ecac9ee292',
    'header-5': '710faf82-caa2-43b2-9e7f-68ea6bc3be03',
  },
  {
    'header-1': 13,
    'header-2': 'Thu Jan 11 2024 00:45:05 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '0f238f2a-9ecf-44fd-8687-45fff0be9478',
    'header-4': '57a951bf-13b1-4209-9011-1652435b9931',
    'header-5': 'aeb1d3e5-9c9f-4966-8ebc-744dd33a022a',
  },
  {
    'header-1': 14,
    'header-2': 'Thu Jan 25 2024 09:48:28 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '367fc30c-d5a3-405f-aa92-591079a60808',
    'header-4': 'd0d08cf6-6b32-4305-b82c-b402d17a4ba6',
    'header-5': '68d4185d-ede7-4761-b25f-4a902aa810e6',
  },
  {
    'header-1': 15,
    'header-2': 'Mon Jan 22 2024 16:18:48 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '61c84a6b-5f76-4b14-a28f-f02dc9b7278c',
    'header-4': '9fcff741-31f2-4b92-b22a-043c8ceda135',
    'header-5': '9832fa31-9645-4b81-966a-60189f4336f0',
  },
  {
    'header-1': 16,
    'header-2': 'Wed Jan 17 2024 15:43:39 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': 'eacd860b-15d1-4820-9d21-23791bb2436f',
    'header-4': '626a6d5e-8afa-4bf0-a54b-526045fd9cf0',
    'header-5': 'a353b57b-e08c-4ccd-9453-909cbca57a8a',
  },
  {
    'header-1': 17,
    'header-2': 'Fri Jan 05 2024 07:29:57 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': 'ca0cb0c0-c483-4a1c-8ec6-15ddb65ad31b',
    'header-4': 'e138df3f-ac0d-4a26-906e-96a9059ba8b7',
    'header-5': '2c9643a4-b02c-45a1-8981-e5dc0e611a7d',
  },
  {
    'header-1': 18,
    'header-2': 'Sat Jan 27 2024 09:55:14 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': '149548dd-3ed1-4ef9-b588-17a413f60a0f',
    'header-4': 'e793bc38-9162-4584-b130-d9115163cac4',
    'header-5': '3911a0a3-c3ab-4425-a1e6-027544a4dabc',
  },
  {
    'header-1': 19,
    'header-2': 'Fri Jan 26 2024 13:22:46 GMT+0000 (Hora padrão da Europa Ocidental)',
    'header-3': 'abd2c3b8-4578-446c-adbc-2b3110a653c1',
    'header-4': 'c3dfb24f-48ec-4c16-94ea-1531e2caeb74',
    'header-5': 'de39d0c7-403c-4fec-9bee-611bfb9090d7',
  },
].sort(() => 0.5 - Math.random())

const buildRows = (data: any) => {
  return data.map((tableCellData: any, idxTR: AnyNode) => {
    const trKey = `tr-${idxTR}`

    const keys = Object.keys(tableCellData)

    const cells = keys.map((k) => {
      const tcKey = `${idxTR}-${k}=${tableCellData[k]}`
      let text: any = tableCellData[k]
      if (k == 'Ação' || tableCellData[k] === 'Consultar') {
        text = (
          <LinkWrapper>
            <a href="/Pedidos">{tableCellData[k]}</a>
          </LinkWrapper>
        )
      } else if (k == 'Estado') {
        text = (
          <div className='flex'>
            <Pill variant={ESTADOS[tableCellData[k]]} circular size='default' className=' circle'/>
            <p>{tableCellData[k]}</p>
          </div>
        )
      }

      return (
        <TableCell key={tcKey} headerLabel={k}>
          {text}
        </TableCell>
      )
    })

    return <TableRow key={trKey}>{cells}</TableRow>
  })
}

const CustomTable = (args: any = DUMMY_DATA) => {
  const AVAILABLE_PAGE_SIZES = [5, 10, 20, 30, 40, 50]
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPageSize, setCurrentPageSize] = useState(5)
  const [rows, setRows] = useState(args.args)

  const [colSortOrders, setColSortOrders] = useState([
    'none',
    'none',
    'none',
    'none',
    'none',
  ] as SortOrder[])

  const [currentSortDescription, setCurrentSortDescription] = useState('')

  const applySort = (colIdx: number, order: SortOrder) => {
    const headerKeys = Object.keys(args[0])

    setCurrentSortDescription(`Applying sort order ${order} via column ${headerKeys[colIdx]}`)

    const newSortOrders = ['none', 'none', 'none', 'none', 'none', 'none'] as SortOrder[]
    newSortOrders[colIdx] = order

    setColSortOrders(newSortOrders)
  }

  /*  if(Object.keys(args).length == 0){
      console.log("here")
      setRows(DUMMY_DATA)
    }else {
      setRows(args)
    } */

  const buildSortData = (idx: number, order: SortOrder) => {
    const newData = [...rows]

    if (idx === 0) {
      return newData.sort((a, b) => {
        const aValue = Number(a['header-1'])
        const bValue = Number(b['header-1'])

        if (order === 'ascending') {
          return bValue - aValue
        }

        return aValue - bValue
      })
    }

    if (idx === 1) {
      return newData.sort((a, b) => {
        const aValue = +new Date(a['header-2'])
        const bValue = +new Date(b['header-2'])

        if (order === 'ascending') {
          return bValue - aValue
        }
        return aValue - bValue
      })
    }

    return newData.sort((a, b) => {
      const aValue = String(a['header-' + (idx + 1)])
      const bValue = String(b['header-' + (idx + 1)])

      if (order === 'ascending') {
        return aValue.localeCompare(bValue)
      }
      return bValue.localeCompare(aValue)
    })
  }

  const rowSlice = useMemo(() => {
    const startIndex = Math.max(0, currentPage * currentPageSize)
    const endIndex = Math.min(rows.length, (currentPage + 1) * currentPageSize)

    const sortIndex = colSortOrders.findIndex((so) => so !== 'none')

    let slice
    if (sortIndex >= 0) {
      const sortedData = buildSortData(sortIndex, colSortOrders[sortIndex])
      slice = sortedData.slice(startIndex, endIndex)
    } else {
      slice = rows.slice(startIndex, endIndex)
    }

    return buildRows(slice)
  }, [currentPage, currentPageSize, colSortOrders])

  const [totalRows] = useState(20)

  const onPageChangeHandler = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const onPageSizeChangeHandler = (newSize: number) => {
    setCurrentPageSize(newSize)
    setCurrentPage(0)
  }

  const headers = 5

  const newHeaders = args.headers
    ? args.headers
    : ['header-0', 'header-1', 'header-2', 'header-3', 'header-4']

  return (
    <Table
      sortDescription={''}
      paginationProps={{
        itemsPerPageLabel: 'Items per page: ',
        itemsPerPage: 5,
        totalItems: 10,
        currentPage: 1,
        availablePageSizes: [10, 20, 50],
        buttonDropdownAriaLabel: 'Custom button label',
        dropdownListAriaLabel: 'Page size dropdown alt text',
        prevButtonAriaLabel: 'Custom previous button label',
        nextButtonAriaLabel: 'Custom next button label',
        onPageChange: () => {},
        onPageSizeChange: () => {},
      }}
    >
      <TableHeader>
        <TableRow>
          {newHeaders.map((header, i) => (
            <TableHeaderCell
              key={i} // Add a unique key for each cell
              onSortChange={(order: SortOrder) => applySort(i, order)}
              sortOrder={colSortOrders[i]}
              sortType="numeric"
            >
              {header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{rowSlice}</TableBody>
    </Table>
  )
}

export default CustomTable
