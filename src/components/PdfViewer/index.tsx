'use client'

import { SearchPagination, SearchPaginationProps } from '@ama-pt/agora-design-system'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { FC, useState } from 'react'
import { Document, DocumentProps, Page } from 'react-pdf'

type Props = {
  file?: DocumentProps['file']
}

export const PdfViewer: FC<Props> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const paginationProps: SearchPaginationProps = {
    totalPages: numPages,
    boundaryCount: 2,
    siblingCount: 3,
    label: 'Impedit sit sunt quaerat',
    nextPageAriaLabel: 'numquam',
    previousPageAriaLabel: 'similique',
    onChange: (nextPage) => setPageNumber(nextPage + 1),
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full flex justify-center min-h-[840px]"
      >
        <Page pageNumber={pageNumber} width={800} />
      </Document>

      <SearchPagination {...paginationProps} />
    </div>
  )
}
