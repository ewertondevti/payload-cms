'use client'

import { Step, Stepper } from '@ama-pt/agora-design-system'

export const StepperBlock = (props) => {
  const { steps, handleNextStep, currentStep } = props

  const handleMoveToNextStep = (stepId: number) => {
    handleNextStep(stepId)
  }

  return (
    <div>
      <Stepper interactive>
        {steps?.steps &&
          steps?.steps?.length > 0 &&
          steps?.steps.map((step: any, index: number) => (
            <Step
              key={step.id}
              status={currentStep == index ? 'current' : currentStep > index ? 'done' : 'disabled'}
              onClick={() => handleMoveToNextStep(index)}
              style={{ cursor: 'pointer' }}
            >
              {step.title}
            </Step>
          ))}
      </Stepper>
    </div>
  )
}
