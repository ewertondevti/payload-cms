import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'certidaoNascimento',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  defaultValue: 'Certidão de Nascimento',
}

export const BirthCertificateBlock: Block = {
  slug: 'birthCertificateData',
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
    plural: 'Certidões de Nascimento',
    singular: 'Certidão de Nascimento',
  },
}
