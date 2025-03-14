'use client'

import { PdfViewer } from '@/components/PdfViewer'
import { addBase64Prefix } from '@/helpers/app'
import { getCertificate } from '@/services/certificateServices'
import { Button, InputText } from '@ama-pt/agora-design-system'
import { FC, useState } from 'react'
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { Title } from '../Form/Title'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type FormValues = {
  accessCode1: string
  accessCode2: string
  accessCode3: string
}

type Props = {
  titlepage: string
  subtitlepage: string
}

export const CertificateConsultationCVC: FC<Props> = ({ titlepage, subtitlepage }) => {
  const [base64file, setBase64file] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

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

  const onSubmit = async ({ accessCode1, accessCode2, accessCode3 }: FormValues) => {
    setIsLoading(true)

    const code = `${accessCode1}-${accessCode2}-${accessCode3}`
    const res = await getCertificate(code)

    if (res.success) {
      setBase64file(addBase64Prefix(res.data.attachment.bytes, res.data.attachment.mimetype))
    }

    setIsLoading(false)
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-[#021C51]">Insira o código de acesso</h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-6">
              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode1', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode1')}
                  hasError={!!errors['accessCode1']}
                />
              </div>

              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode2', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode2')}
                  hasError={!!errors['accessCode2']}
                />
              </div>

              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode3', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode3')}
                  hasError={!!errors['accessCode3']}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                hasIcon
                leadingIcon="agora-line-arrow-right-circle"
                leadingIconHover="agora-solid-arrow-right-circle"
              >
                Consultar
              </Button>
            </div>
          </div>
        </div>
      </form>

      <PdfViewer file={base64file} isLoading={isLoading} />
    </div>
  )
}
