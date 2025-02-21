import type { Block } from 'payload'

const SummaryServiceStepBlock: Block = {
  slug: 'summary-service-steps',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Resumo',
    },
  ],
}

export default SummaryServiceStepBlock
