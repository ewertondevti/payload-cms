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

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  localized: true,
}

export const SelectWithApiBlock: Block = {
  slug: 'selectWithApi',
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
    placeholder,
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'apidomain',
          label: 'API Domain',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Select with API Fields',
    singular: 'Select with API',
  },
}
