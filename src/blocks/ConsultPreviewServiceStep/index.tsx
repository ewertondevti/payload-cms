'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { FC } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { Title } from '../Form/Title'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type Props = {
  titlepage: string
  subtitlepage: string
}

export const ConsultPreview: FC<Props> = ({ titlepage, subtitlepage }) => {
  return (
    <div className="flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[8px]">
        <Title label={titlepage} className="my-[0] text-[32px] leading-[48px]" />
        <small className="text-[16px] leading-[28px]">{subtitlepage}</small>
      </div>

      <PdfViewer file="/mock/mock_document.pdf" />
    </div>
  )
}
