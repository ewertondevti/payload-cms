import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'identificacao',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  defaultValue: 'Cartão de Cidadão',
}

export const IdBlock: Block = {
  slug: 'idData',
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
    plural: 'Identificações',
    singular: 'Identificação',
  },
}
