'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { addBase64Prefix } from '@/helpers/app'
import { getCertificate } from '@/services/certificateServices'
import { LoaderDialogProvider, useLoaderDialogContext } from '@ama-pt/agora-design-system'
import { FC, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { ConsultFormCVCValues } from '../ConsultFormCVC'
import { Title } from '../Form/Title'
import { CertificatePreviewError } from './CertificatePreviewError'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type Props = UseFormReturn & {
  titlepage: string
  subtitlepage: string
  apiurl: string
}

export const CertificatePreviewCVC: FC<Props> = ({
  titlepage,
  subtitlepage,
  apiurl,
  handleSubmit,
}) => {
  const [base64file, setBase64file] = useState('')
  const [hasError, setHasError] = useState(false)

  const { showLoader, hideLoader, visibility } = useLoaderDialogContext()

  useEffect(() => {
    showLoader({ title: 'A carregar...', subtitle: 'Aguarde um momento.' })

    handleSubmit(async (values: ConsultFormCVCValues) => {
      const { accessCode1, accessCode2, accessCode3 } = values

      const code = `${accessCode1}-${accessCode2}-${accessCode3}`

      try {
        const res = await getCertificate(apiurl, code)

        setBase64file(addBase64Prefix(res.data.attachment.bytes, res.data.attachment.mimetype))
        setHasError(false)
      } catch (error) {
        console.error(error)
        setHasError(true)
      }
    })()
  }, [apiurl])

  useEffect(() => {
    hideLoader()
  }, [base64file, hasError])

  return (
    <LoaderDialogProvider>
      <div className="flex flex-col w-fit gap-64" data-testid="consult-preview">
        <Title
          label={titlepage}
          sublabel={subtitlepage}
          className="my-[0] text-[32px] leading-[48px]"
        />

        {hasError && <CertificatePreviewError />}
        {!hasError && <PdfViewer file={base64file} isLoading={!!visibility} />}
      </div>
    </LoaderDialogProvider>
  )
}
