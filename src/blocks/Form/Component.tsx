'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'

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

  const router = useRouter()
  const t = useTranslations()
  // useEffect(() => {
  //   const fetchSubmitToken = async () => {
  //     try {
  //       const response = await fetch('/api/send-token', { method: 'POST' })
  //       const data = await response.json()
  //       console.log(response)
  //       if (data.submitToken) {
  //         setSubmitToken(data.submitToken)
  //       } else {
  //         setError({ message: 'Falha ao obter token de submissão' })
  //       }
  //     } catch (err) {
  //       console.error('Erro ao obter submitToken:', err)
  //       setError({ message: 'Falha ao obter token de submissão' })
  //     }
  //   }
  //   fetchSubmitToken()
  // }, [])

  let onSubmit
  if (onSubmitOverride) {
    onSubmit = useCallback(
      (data: Data) => {
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
    onSubmit = useCallback(
      async (data: Data) => {
        setError(undefined)
        let loadingTimerID: ReturnType<typeof setTimeout> | undefined

        try {
          if (!submitToken) {
            setError({ message: 'Token de submissão ausente ou inválido' })
            return
          }
          const dataToSend = Object.entries(data).map(([name, value]) => ({
            name,
            value,
            fieldPath: name,
          }))

          loadingTimerID = setTimeout(() => setIsLoading(true), 1000)

          // const mosparoResponse = await fetch('/api/mosparo-check', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     publicKey: 'erNgKndOLlyfLpxb6lIuUYBJf5HslQkwYr98t5pPd-g',
          //     submitToken,
          //     formData: { fields: dataToSend },
          //   }),
          // })
          // const mosparoResult = await mosparoResponse.json()
          // if (!mosparoResult || mosparoResult.error || !mosparoResult.valid) {
          //   clearTimeout(loadingTimerID)
          //   setIsLoading(false)
          //   setError({ message: 'Mosparo validataion error' })
          //   return
          // }

          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn('Erro in the submission process', err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({ message: 'Something is wrong with the request.' })
        }
      },
      [router, formID, redirect, confirmationType, submitToken],
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

        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}

        <form key="form" id={formID} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-64 w-[800px]">
            {formFromProps.fields.map((field, index) => {
              const Field = fields?.[field.blockType] as React.FC<any> | undefined
              if (Field) {
                return (
                  <div className="last:mb-0" key={`${index}_${stepIndex}`}>
                    <Field
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
