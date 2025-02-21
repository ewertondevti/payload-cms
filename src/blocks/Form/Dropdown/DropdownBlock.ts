import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label'
}

export const DropdownBlock: Block = {
  slug: 'dropdown',
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
    {
      name: 'options',
      type: 'array',
      label: 'Options',
      labels: {
        singular: 'option',
        plural: 'options',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Dropdown',
    singular: 'Dropdown',
  },
}