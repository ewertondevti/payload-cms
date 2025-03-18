import { Block, Field } from 'payload'

const name: Field = {
  localized: true,
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: '',
  admin: { width: 'calc(100% / 3)' },
}

const identificationType: Field = {
  type: 'select',
  label: 'Tipo de Identificação',
  name: 'identificationType',
  options: [
    {
      label: 'Morada',
      value: 'identification-data',
    },
    {
      label: 'Identificação pai/mae',
      value: 'parent-data',
    },
    {
      label: 'Local e data do casamento',
      value: 'place-date',
    },
    {
      label: 'Morada de casamento',
      value: 'wedding-data',
    },
    {
      label: 'Local e data do casamento na conservatoria',
      value: 'wedding-place-data',
    },
  ],
  defaultValue: 'identification-data',
  admin: { width: 'calc(100% / 3)' },
}

export const AddressDataBlock: Block = {
  slug: 'addressdata',
  fields: [
    {
      type: 'row',
      fields: [
        name,
        {
          name: 'title',
          type: 'text',
          label: 'Section title',
          defaultValue: 'Morada',
          admin: { width: 'calc(100% / 3)' },
        },
        identificationType,
      ],
    },
  ],
  labels: {
    singular: 'Morada',
    plural: 'Moradas',
  },
}
