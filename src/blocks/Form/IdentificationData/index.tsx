import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Title } from '../Title'
import { ApplicantData } from './ApplicantData'
import { ParentData, ParentDataProps } from './ParentData'

export type IdentificationDataProps = UseFormReturn &
  ParentDataProps & {
    errors: FieldErrors<FieldValues>
    nifIsRequired: boolean
    nifIsVisible: boolean
    isVerificationDigitRequired: boolean
    isVerificationDigitVisible: boolean
    title: string
    identificationType: 'applicant-data' | 'parent-data' | 'baby-data'
  }

export const IdentificationData: FC<IdentificationDataProps> = (props) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <style>
        {`
          .agora-input-select-label {
            margin-bottom: 8px !important;
          }

          .input-label-wrapper {
            margin-bottom: 8px !important;
          }
        `}
      </style>

      <Title label={props.title} htmlTag="h2" />

      {props.identificationType === 'applicant-data' && <ApplicantData {...props} />}
      {props.identificationType === 'parent-data' && <ParentData {...props} />}
    </div>
  )
}
