import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'requerente',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  defaultValue: 'Requerente',
}

export const RequestorBlock: Block = {
  slug: 'requestorData',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Requerentes',
    singular: 'Requerente',
  },
}
