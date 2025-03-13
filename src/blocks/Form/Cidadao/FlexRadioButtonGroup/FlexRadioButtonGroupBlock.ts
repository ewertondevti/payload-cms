import { Block, Field } from 'payload'
import { AtomicField } from '../types'

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
  defaultValue: '',
  localized: true,
}

export type AlignmentDirection = 'vertical' | 'horizontal'
const options: AtomicField<AlignmentDirection>[] = [
  {
    label: 'Vertical',
    value: 'vertical',
  },

  {
    label: 'Horizontal',
    value: 'horizontal',
  },
]

const alignment: Field = {
  name: 'alignment',
  type: 'radio',
  label: 'Alignment',
  options,
}

export const FlexRadioButtonGroupBlock: Block = {
  slug: 'flexRadioButtonGroup',
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
    alignment,
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
    plural: 'Flex Radio Button Groups',
    singular: 'Flex Radio Button Group',
  },
}
