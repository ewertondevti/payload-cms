import type { Block, Field } from 'payload'

const label: Field = {
  name: 'label',
  type: 'text',
  defaultValue: '',
  label: 'Label',
  localized: true,
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const DateOrYearPickerBlock: Block = {
  slug: 'dateoryearpicker',
  fields: [
    {
      ...label,
      name: 'radioLabel',
      defaultValue: 'Sei a data exata de nascimento ou apenas o ano?',
      label: 'Radio label',
      localized: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          ...label,
          name: 'dateLabel',
          defaultValue: 'Data de nascimento',
          label: 'Date label',
          localized: true,
          required: true,
        },
        {
          ...label,
          name: 'yearLabel',
          defaultValue: 'Ano de nascimento',
          label: 'Year label',
          localized: true,
          required: true,
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Date or Year Pickers',
    singular: 'Date or Year Picker',
  },
}
