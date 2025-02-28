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
      ...label,
      name: 'radioLabel',
      label: 'Radio label',
      defaultValue: 'Sei a data exata de nascimento ou apenas o ano?',
      localized: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          ...label,
          name: 'dateLabel',
          label: 'Date label',
          defaultValue: 'Data de nascimento',
          localized: true,
          required: true,
        },
        {
          ...label,
          name: 'yearLabel',
          label: 'Year label',
          defaultValue: 'Ano de nascimento',
          localized: true,
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
