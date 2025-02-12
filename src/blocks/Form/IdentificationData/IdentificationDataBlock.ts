import { Block } from 'payload'

export const IdentificationDataBlock: Block = {
  slug: 'identificationData',
  fields: [
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
        },
      ],
    },
  ],
  labels: {
    singular: 'Dados de Identificação',
    plural: 'Dados de Identificação',
  },
}
