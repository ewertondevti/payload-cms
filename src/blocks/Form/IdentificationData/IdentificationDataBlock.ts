import { Block } from 'payload'

export const IdentificationDataBlock: Block = {
  slug: 'identificationData',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section title',
      defaultValue:'Dados de identificação'
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nifIsVisible',
          type: 'checkbox',
          label: 'Is NIF visible?',
        },
        {
          name: 'nifIsRequired',
          type: 'checkbox',
          label: 'Is NIF required?',
          admin: {
            condition: (_, { nifIsVisible }) => Boolean(nifIsVisible),
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Dados de Identificação',
    plural: 'Dados de Identificação',
  },
}
