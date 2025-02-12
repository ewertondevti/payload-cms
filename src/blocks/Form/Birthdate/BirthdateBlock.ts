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
    required,
  ],
  labels: {
    plural: 'Birthdates',
    singular: 'Birthdate',
  },
}
