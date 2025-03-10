import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'telemovel',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  defaultValue: 'Telemóvel',
  localized: true,
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  defaultValue: 'Insira número de telemóvel',
  localized: true,
}

const readOnly: Field = {
  name: 'readOnly',
  type: 'checkbox',
  label: 'Read Only',
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

const searchable: Field = {
  name: 'searchable',
  type: 'checkbox',
  label: 'Searchable',
}


const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Width (%)',
  defaultValue: 100,
  admin: {
    step: 1,
    width: '50%',
  },
}

export const PhoneNumberBlock: Block = {
  slug: 'phoneNumber',
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
      type: 'row',
      fields: [
        {
          ...placeholder,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'searchInputPlaceholder',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Placeholder for search input',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...required,
          admin: {
            width: 'calc(100% / 3)',
          },
        },
        {
          ...readOnly,
          admin: {
            width: 'calc(100% / 3)',
          },
        },
        {
          ...searchable,
          admin: {
            width: 'calc(100% / 3)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        width,
      ],
    },
  ],
  labels: {
    plural: 'Telemóveis',
    singular: 'Telemóvel',
  },
}
