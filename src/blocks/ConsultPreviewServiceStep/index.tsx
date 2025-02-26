'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { GetCertidao } from '@/services/certidaoServices'
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
}

const MOCK_CODE = '1001-5548-0239'

export const ConsultPreview: FC<Props> = ({ titlepage, subtitlepage }) => {
  const [base64file, setBase64file] = useState('')

  useEffect(() => {
    GetCertidao(MOCK_CODE).then((data) => {
      setBase64file(`data:${data.attachment.mimetype};base64,${data.attachment.bytes}`)
    })
  }, [])

  return (
    <div className="flex flex-col gap-[64px]">
      <Title
        label={titlepage}
        sublabel={subtitlepage}
        className="my-[0] text-[32px] leading-[48px]"
      />

      <PdfViewer file={base64file} />
    </div>
  )
}
