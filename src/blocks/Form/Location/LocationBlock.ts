import { Block, Field } from 'payload'

const name: Field = {
  localized: true,
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: '',
}

export const LocationBlock: Block = {
  slug: 'location',
  fields: [
    name,
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
