'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import React, { useState, useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { buildInitialFormState } from '../Form/buildInitialFormState'
import { fields } from '../Form/fields'

export type Value = unknown

export interface Property {
 [key: string]: Value
}

export interface Data {
 [key: string]: Property | Property[]
}

export type BirthConsultationFormBlockType = {
 blockName?: string
 blockType?: 'birthbonsultationForm'
 enableIntro: boolean
 introContent?: {
  [k: string]: unknown
 }[]
 showSubmitButton?: boolean
 form: FormType
}

interface BirthConsultationFormProps extends BirthConsultationFormBlockType {
 id?: string
 stepIndex: number
 onSubmitOverride?: (data: Data) => void
}

export const BirthConsultationForm: React.FC<BirthConsultationFormProps> = (props) => {
 const {
  enableIntro,
  introContent,
  showSubmitButton = true,
  form,
  onSubmitOverride,
  stepIndex,
 } = props

 const {
  id: formID,
  fields: formFields = [],
  confirmationMessage,
  confirmationType,
  redirect,
  submitButtonLabel,
 } = form || {}

 const [isLoading, setIsLoading] = useState(false)
 const [hasSubmitted, setHasSubmitted] = useState(false)
 const [error, setError] = useState<{ message: string; status?: string }>()

 const router = useRouter()
 const t = useTranslations()

 const formMethods = useForm({
  defaultValues: buildInitialFormState(formFields),
 })

 const {
  control,
  formState: { errors },
  handleSubmit,
  register,
 } = formMethods

 const onSubmit = useCallback(
  (data: Data) => {
   if (onSubmitOverride) {
    if (!hasSubmitted) {
     onSubmitOverride(data)
    }

    setIsLoading(false)
    setHasSubmitted(false)
    setError(undefined)
    return
   }

   let loadingTimerID: ReturnType<typeof setTimeout>
   const submitForm = async () => {
    setError(undefined)

    const dataToSend = Object.entries(data).map(([name, value]) => ({
     field: name,
     value,
    }))

    loadingTimerID = setTimeout(() => {
     setIsLoading(true)
    }, 1000)

    try {
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

     if (confirmationType === 'redirect' && redirect?.url) {
      router.push(redirect.url)
     }
    } catch (err) {
     console.warn(err)
     clearTimeout(loadingTimerID)
     setIsLoading(false)
     setError({
      message: 'Something went wrong.',
     })
    }
   }

   void submitForm()
  },
  [onSubmitOverride, hasSubmitted, formID, router, redirect, confirmationType],
 )

 if (!formFields?.length) {
  return null
 }

 const renderedFields = useMemo(() => {
  return formFields.map((field, index) => {
   const Field: React.FC<any> = fields?.[field.blockType]
   if (!Field) return null

   return (
    <div className="last:mb-0" key={`${index}_${stepIndex}`}>
     <Field
      form={form}
      {...field}
      {...formMethods}
      control={control}
      errors={errors}
      register={register}
     />
    </div>
   )
  })
 }, [formFields, form, formMethods, control, errors, register, stepIndex])

 return (
  <div className="container">
   <FormProvider {...formMethods}>
    {enableIntro && introContent && !hasSubmitted && (
     <RichText
      className="mb-8"
      content={introContent}
      enableGutter={false}
     />
    )}

    {isLoading && !hasSubmitted && <p>{t('loading')}</p>}
    {error && (
     <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
    )}

    {!hasSubmitted && (
     <form id={formID} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-16">
       {renderedFields}
      </div>
      {showSubmitButton && (
       <Button form={formID} type="submit" variant="default">
        {submitButtonLabel}
       </Button>
      )}
     </form>
    )}

    {!onSubmitOverride && hasSubmitted && confirmationType === 'message' && (
     <RichText content={confirmationMessage} />
    )}
   </FormProvider>
  </div>
 )
}