import { Block } from 'payload'

export const BirthplaceBlock: Block = {
  slug: 'birthplace',
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      defaultValue: 'País de naturalidade',
    },
  ],
  labels: {
    plural: 'Naturalidade',
    singular: 'Naturalidade',
  },
}
