'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useTranslations } from 'next-intl'
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
  introContent?: {
    [k: string]: unknown
  }[]
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
  const router = useRouter()
  const t = useTranslations()

  let onSubmit

  // console.log("onSubmitOverride", onSubmitOverride)

  if (onSubmitOverride) {
    onSubmit = useCallback(
      (data: Data) => {
        // console.log('onSubmitOverride');

        // console.log("data:", data)
        // console.log("hasSubmitted:", hasSubmitted)

        if (!hasSubmitted) {
          onSubmitOverride(data)
        }

        setIsLoading(false)
        setHasSubmitted(false) // Ensure form submission state is managed
        setError(undefined) // Ensure error state is cleared
      },
      [onSubmitOverride],
    )
  } else {
    onSubmit = useCallback(
      (data: Data) => {
        let loadingTimerID: ReturnType<typeof setTimeout>
        const submitForm = async () => {
          setError(undefined)

          const dataToSend = Object.entries(data).map(([name, value]) => ({
            field: name,
            value,
          }))

          // delay loading indicator by 1s
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

            if (confirmationType === 'redirect' && redirect) {
              const { url } = redirect

              const redirectUrl = url

              if (redirectUrl) router.push(redirectUrl)
            }
          } catch (err) {
            console.warn(err)
            setIsLoading(false)
            setError({
              message: 'Something went wrong.',
            })
          }
        }

        void submitForm()
      },
      [router, formID, redirect, confirmationType],
    )
  }

  // console.log("stepIndex", stepIndex)
  // console.log("formID", formID)

  if (!formFromProps?.fields?.length) return null

  return (
    <div className="container">
      <FormProvider {...formMethods}>
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8" content={introContent} enableGutter={false} />
        )}
        {/* {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText content={confirmationMessage} />
        )} */}
        {isLoading && !hasSubmitted && <p>{t('loading')}</p>}
        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
        {true && (
          <form key={'form'} id={formID} onSubmit={handleSubmit(onSubmit)} noValidate>
            <>
              <div className="flex flex-col gap-16">
                {formFromProps.fields.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType]
                  if (Field) {
                    return (
                      <div className="last:mb-0 w-full" key={index + '_' + stepIndex}>
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
                  {submitButtonLabel}
                </Button>
              )}
            </>
          </form>
        )}
      </FormProvider>
    </div>
  )
}
