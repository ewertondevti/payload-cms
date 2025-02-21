'use client'
import React, { useMemo, useState } from 'react'
import {
  SortOrder,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableFooter,
  Pill,
} from '@ama-pt/agora-design-system'

interface TableGeneralProps {
  columns: Array<{
    label: string
    field: string
    type: 'string' | 'numeric' | 'date' | 'pill' | 'array' | 'jsx'
    enableSort?: boolean
  }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<any>
  footer?: Array<{
    headerLabel: string
    value: string | number
  }>
  paginationProps?: {
    itemsPerPageLabel: string
    itemsPerPage: number
    totalItems: number
    currentPage: number
    availablePageSizes: number[]
    buttonDropdownAriaLabel: string
    dropdownListAriaLabel: string
    prevButtonAriaLabel: string
    nextButtonAriaLabel: string
  }
  enablePagination?: boolean
  onClickRow?: (row: unknown) => void
}

export const TableGeneral = ({
  columns,
  rows,
  footer,
  paginationProps,
  enablePagination = true,
  onClickRow,
}: TableGeneralProps) => {
  const [colSortOrders, setColSortOrders] = useState(
    Array(columns.length).fill('none') as SortOrder[],
  )
  const [currentSortDescription, setCurrentSortDescription] = useState('')
  const [currentPageState, setCurrentPageState] = useState(paginationProps?.currentPage || 0)
  const [itemsPerPageState, setItemsPerPageState] = useState(
    paginationProps?.itemsPerPage || rows?.length,
  )

  const onPageChange = (newPage: number) => {
    setCurrentPageState(newPage)
  }

  const onPageSizeChange = (newSize: number) => {
    setItemsPerPageState(newSize)
  }

  const applySort = (colIdx: number, order: SortOrder) => {
    setCurrentSortDescription(`Applying sort order ${order} via column ${columns[colIdx].label}`)

    const newSortOrders = Array(columns.length).fill('none') as SortOrder[]
    newSortOrders[colIdx] = order

    setColSortOrders(newSortOrders)
  }

  const buildSortData = (idx: number, order: SortOrder) => {
    const newData = [...rows]
    const columnField = columns[idx].field

    if (columns[idx].type === 'numeric') {
      return newData.sort((a, b) =>
        order === 'ascending'
          ? Number(a[columnField]) - Number(b[columnField])
          : Number(b[columnField]) - Number(a[columnField]),
      )
    }

    if (columns[idx].type === 'date') {
      return newData.sort((a, b) =>
        order === 'ascending'
          ? +new Date(a[columnField]) - +new Date(b[columnField])
          : +new Date(b[columnField]) - +new Date(a[columnField]),
      )
    }

    return newData.sort((a, b) =>
      order === 'ascending'
        ? String(a[columnField]).localeCompare(String(b[columnField]))
        : String(b[columnField]).localeCompare(String(a[columnField])),
    )
  }

  const rowSlice = useMemo(() => {
    const startIndex = enablePagination ? Math.max(0, currentPageState * itemsPerPageState) : 0
    const endIndex = enablePagination
      ? Math.min(rows.length, (currentPageState + 1) * itemsPerPageState)
      : rows?.length

    const sortIndex = colSortOrders.findIndex((so) => so !== 'none')

    let slice
    if (sortIndex >= 0) {
      const sortedData = buildSortData(sortIndex, colSortOrders[sortIndex])
      slice = sortedData.slice(startIndex, endIndex)
    } else {
      slice = rows?.slice(startIndex, endIndex)
    }

    return slice?.map((row, rowIdx) => (
      <TableRow key={`tr-${rowIdx}`} onClick={() => onClickRow && onClickRow(row)}>
        {columns.map((column, colIdx) => {
          const content =
            column.type === 'pill' ? (
              <Pill>{row[column.field]}</Pill>
            ) : column.type === 'array' ? (
              row[column.field].toString().replace(/,/g, ', ')
            ) : (
              row[column.field]
            )

          return (
            <TableCell key={`tc-${rowIdx}-${colIdx}`} headerLabel={column.label}>
              {content}
            </TableCell>
          )
        })}
      </TableRow>
    ))
  }, [currentPageState, itemsPerPageState, colSortOrders, rows])

  return (
    <Table
      sortDescription={currentSortDescription}
      paginationProps={
        enablePagination && paginationProps
          ? {
              ...paginationProps,
              itemsPerPage: itemsPerPageState,
              currentPage: currentPageState,
              onPageChange,
              onPageSizeChange,
            }
          : undefined
      }
    >
      <TableHeader>
        <TableRow>
          {columns.map((column, colIdx) => (
            <TableHeaderCell
              key={`th-${colIdx}`}
              onSortChange={
                column.enableSort ? (order: SortOrder) => applySort(colIdx, order) : undefined
              }
              sortOrder={colSortOrders[colIdx]}
              sortType={
                column.enableSort &&
                column.type !== 'pill' &&
                column.type !== 'array' &&
                column.type !== 'jsx'
                  ? column.type
                  : undefined
              }
            >
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{rowSlice}</TableBody>
      {footer ? (
        <TableFooter>
          <TableRow>
            {footer.map((cell, idx) => (
              <TableCell key={`footer-${idx}`} headerLabel={cell.headerLabel}>
                {cell.value}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      ) : (
        <></>
      )}
    </Table>
  )
}
