import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: '',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
  defaultValue: '',
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const BirthdateBlock: Block = {
  slug: 'birthdate',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          defaultValue: 'birthdate',
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          defaultValue: 'Data de nascimento',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'options',
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
    required,
  ],
  labels: {
    plural: 'Birthdates',
    singular: 'Birthdate',
  },
}
