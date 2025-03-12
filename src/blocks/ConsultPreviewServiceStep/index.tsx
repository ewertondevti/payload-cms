'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { GetCertidaoResponse } from '@/models/certificate'
import { FC, useEffect, useState } from 'react'
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
  certidaoResponse?: GetCertidaoResponse
  isLoading: boolean
}

const MOCK_CODE = '1001-5548-0239'

export const ConsultPreview: FC<Props> = ({
  titlepage,
  subtitlepage,
  certidaoResponse,
  isLoading,
}) => {
  const [base64file, setBase64file] = useState('')

  useEffect(() => {
    if (certidaoResponse) {
      setBase64file(
        `data:${certidaoResponse.data.attachment.mimetype};base64,${certidaoResponse.data.attachment.bytes}`,
      )
    }
  }, [certidaoResponse])

  return (
    <div className="flex flex-col w-fit gap-[64px]" data-testid="consult-preview">
      <Title
        label={titlepage}
        sublabel={subtitlepage}
        className="my-[0] text-[32px] leading-[48px]"
      />

      <PdfViewer file={base64file} isLoading={isLoading} />
    </div>
  )
}
