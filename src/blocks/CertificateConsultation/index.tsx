'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { GetCertidaoResponse } from '@/models/certificate'
import { InputText } from '@ama-pt/agora-design-system'
import { FC, useEffect, useState } from 'react'
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form'
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

export const CertificateConsultation: FC<Props> = ({
  titlepage,
  subtitlepage,
  certidaoResponse,
  isLoading,
}) => {
  const [base64file, setBase64file] = useState('')

  const {
    register,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (certidaoResponse) {
      setBase64file(
        `data:${certidaoResponse.data.attachment.mimetype};base64,${certidaoResponse.data.attachment.bytes}`,
      )
    }
  }, [certidaoResponse])

  const getErrorMessage = (fieldname: string) => {
    switch (errors[fieldname]?.type) {
      case 'required':
        return 'Obrigatório preencher este campo.'

      case 'minLength':
        return 'Limite mínimo de dígitos é 4'

      case 'maxLength':
        return 'Limite máximo de dígitos é 4'

      default:
        return ''
    }
  }

  const registerOptions: RegisterOptions<FieldValues> = {
    required: true,
    minLength: 4,
    maxLength: 4,
  }

  return (
    <div className="flex flex-col w-fit gap-16" data-testid="consult-preview">
      <Title
        label={titlepage}
        sublabel={subtitlepage}
        className="my-[0] text-[32px] leading-[48px]"
      />

      <Title label="Código de acesso" htmlTag="h2" />

      <form>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-[#021C51]">Insira o código de acesso</h2>
          <div className="grid grid-cols-3 gap-6">
            <InputText
              placeholder="0000"
              {...register('accessCode1', registerOptions)}
              feedbackState="danger"
              feedbackText={getErrorMessage('accessCode1')}
              hasError={!!errors['accessCode1']}
            />

            <InputText
              placeholder="0000"
              {...register('accessCode2', registerOptions)}
              feedbackState="danger"
              feedbackText={getErrorMessage('accessCode2')}
              hasError={!!errors['accessCode2']}
            />

            <InputText
              placeholder="0000"
              {...register('accessCode3', registerOptions)}
              feedbackState="danger"
              feedbackText={getErrorMessage('accessCode3')}
              hasError={!!errors['accessCode3']}
            />
          </div>
        </div>
      </form>

      <PdfViewer file={base64file} isLoading={isLoading} />
    </div>
  )
}
