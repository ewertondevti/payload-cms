import { Block, Field } from 'payload'

const name: Field = {
  localized: true,
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
  defaultValue: '',
  localized: true,
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

const disabled: Field = {
  name: 'disabled',
  type: 'checkbox',
  label: 'Disabled',
}

const readOnly: Field = {
  name: 'readOnly',
  type: 'checkbox',
  label: 'Read Only',
}

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

export const CustomNumberBlock: Block = {
  slug: 'customNumber',
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
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Placeholder',
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'min',
          type: 'number',
          label: 'Minimum Value',
        },
        {
          name: 'max',
          type: 'number',
          label: 'Maximum Value',
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
          ...disabled,
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
      ],
    },
  ],
  labels: {
    plural: 'Number',
    singular: 'Number',
  },
}
