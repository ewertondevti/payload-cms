import type { Block } from 'payload'


const FormServiceStepBlock: Block = {
  slug: 'form-service-steps',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}

export default FormServiceStepBlock
