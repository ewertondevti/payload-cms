import { Block } from 'payload'

export const LocationBlock: Block = {
  slug: 'location',
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
    plural: 'Locations',
    singular: 'Location',
  },
}
