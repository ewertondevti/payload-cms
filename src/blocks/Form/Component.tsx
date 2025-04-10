'use client'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import MosparoValidator from './MosparoValidator/MosparoValidator'

export type Value = unknown
export interface Property {
  [key: string]: Value
}
export interface Data {
  [key: string]: Property | Property[]
}
export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: { [k: string]: unknown }[]
}

export const FormBlock: React.FC<
  {
    id?: string
    stepIndex: number
    onSubmitOverride?: (data: Data) => void
    showSubmitButton: boolean
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    onSubmitOverride,
    showSubmitButton = true,
    stepIndex,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps?.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [submitToken, setSubmitToken] = useState<string | null>(null)
  const [validationSignature, setValidationSignature] = useState<string | null>(null)
  const [formSignature, setFormSignature] = useState<string | null>(null)
  const [verifiedFormData, setVerifiedFormData] = useState<Record<string, string> | null>(null)

  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    const fetchSubmitToken = async () => {
      console.log('[FormBlock] Starting fetch for submit token from /api/send-token...')
      try {
        const response = await fetch('/api/send-token', { method: 'POST' })
        const data = await response.json()
        console.log('[FormBlock] /api/send-token response:', data)

        if (data.submitToken) {
          setSubmitToken(data.submitToken)
        } else {
          setError({ message: 'Fail to get the token' })
        }
      } catch (err) {
        console.error('[FormBlock] Error fetching token:', err)
        setError({ message: 'Fail to get the token' })
      }
    }
    fetchSubmitToken()
  }, [])

  // 2. Definir lógica de onSubmit
  let onSubmit
  if (onSubmitOverride) {
    // Se houver callback custom para onSubmit
    onSubmit = useCallback(
      (data: Data) => {
        console.log('[FormBlock] onSubmitOverride called, data =>', data)
        if (!hasSubmitted) {
          onSubmitOverride(data)
        }
        setIsLoading(false)
        setHasSubmitted(false)
        setError(undefined)
      },
      [onSubmitOverride, hasSubmitted],
    )
  } else {
    // Fluxo normal do onSubmit
    onSubmit = useCallback(
      async (data: Data) => {
        console.log('[FormBlock] onSubmit called, data =>', data)
        setError(undefined)
        let loadingTimerID: ReturnType<typeof setTimeout> | undefined

        try {
          if (!submitToken) {
            console.warn('[FormBlock] No submitToken found, cannot proceed.')
            setError({ message: 'Token de submissão ausente ou inválido' })
            return
          }

          // Mapeia os dados para o formato esperado pelo Payload CMS:
          // Cada item deve ter a propriedade "field" (identificador do campo) e "value".
          const dataToSend = Object.entries(data).map(([field, value]) => ({
            field, // Certifique-se de que este valor bate com o identificador definido no seu formulário Payload
            value,
          }))

          // Log para depuração dos estados de verificação
          console.log('[FormBlock] Checking advanced verification states =>', {
            validationSignature,
            formSignature,
            verifiedFormData,
          })

          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })

          const verifyJson = await verifyRes.json()
          console.log('[FormBlock] /api/verify response =>', verifyJson)

          if (!verifyJson.valid) {
            clearTimeout(loadingTimerID)
            setIsLoading(false)
            setError({ message: 'Verification failed: Data may have been manipulated.' })
            return
          }

          console.log('[FormBlock] Submitting data to Payload => /api/form-submissions')
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: String(req.status),
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          console.log('[FormBlock] Form submission success =>', res)

          // Se houver redirect no campo de confirmação
          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) {
              console.log('[FormBlock] Redirecting to =>', url)
              router.push(url)
            }
          }
        } catch (err) {
          console.warn('[FormBlock] Error in submission process =>', err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({ message: 'Something is wrong with the request.' })
        }
      },
      [
        router,
        formID,
        redirect,
        confirmationType,
        submitToken,
        validationSignature,
        formSignature,
        verifiedFormData,
      ],
    )
  }

  if (!formFromProps?.fields?.length) return null

  return (
    <div className="container">
      <FormProvider {...formMethods}>
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8" content={introContent} enableGutter={false} />
        )}
        {isLoading && !hasSubmitted && <p>{t('loading')}</p>}

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {`${error.status || '500'}: ${error.message || ''}`}
          </div>
        )}

        <form key="form" id={formID} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex w-[800px] flex-col gap-64">
            {formFromProps.fields.map((field, index) => {
              const FieldComponent = fields?.[field.blockType] as React.FC<any> | undefined
              if (FieldComponent) {
                return (
                  <div className="last:mb-0" key={`${index}_${stepIndex}`}>
                    <FieldComponent
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  </div>
                )
              }
              return null
            })}
          </div>

          <MosparoValidator />

          {showSubmitButton && (
            <Button form={formID} type="submit" variant="default">
              {submitButtonLabel || 'Enviar'}
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  )
}
