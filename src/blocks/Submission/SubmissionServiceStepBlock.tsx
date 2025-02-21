import type { Block } from 'payload'

const SubmissionServiceStepBlock: Block = {
  slug: 'submission-service-steps',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Submissão',
    },
  ],
}

export default SubmissionServiceStepBlock
