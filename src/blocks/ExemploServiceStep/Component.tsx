
// FIXME: DEMO
const BlockType = {
  content: 'content-service-steps',
  form: 'form-service-steps',
  payment: 'payment-service-steps',
  submission: 'submission-service-steps',
  summary: 'summary-service-steps',
  exemplo: 'exemplo1ServiceSteps',
}
// FIXME: DEMO


export type ExemploBlockConfig = {
  title: string
  content: any
  // stepIndex: number
  // steps: any
  // changeToNextStep: (stepIndex: number) => void
  // blockType: string
  // handleSaveAndExit: () => void
}

// import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Width } from '../Form/Width'
import { InputText, Button } from '@ama-pt/agora-design-system'
import { ContentBlock } from '../Content/Component'

export const ExemploBlock: React.FC<
  ExemploBlockConfig & {
    // register: UseFormRegister<FieldValues>
  }
> = ({
  title,
  content,
  // stepIndex,
  // steps,
  // changeToNextStep,
  // handleSaveAndExit,
}) => {

  let richText
  richText = { richText: { root: content.root }, size: 'full' }

  return (
    <>
    <Width width="100">
      <InputText
        id='exemplo1'
        label={title}
        type="text"
        hasFeedback={true}
      />
    </Width>
    <ContentBlock blockType="content" columns={[richText]} />
    </>
  )
}
