import { Block, Field } from 'payload'

const identificationType: Field = {
  type: 'select',
  label: 'Tipo de Identificação',
  name: 'identificationType',
  options: [
    {
      label: 'Dados do requerente',
      value: 'applicant-data',
    },
    {
      label: 'Dados do primeiro/segundo progenitor',
      value: 'parent-data',
    },
    {
      label: 'Dados do bebé',
      value: 'baby-data',
    },
  ],
  defaultValue: 'applicant-data',
  admin: { width: '50%' },
}

export const IdentificationDataBlock: Block = {
  slug: 'identificationData',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section title',
          defaultValue: 'Dados de identificação',
          admin: { width: '50%' },
        },
        identificationType,
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nifIsVisible',
          type: 'checkbox',
          label: 'Is NIF visible?',
          admin: { width: '50%' },
        },
        {
          name: 'nifIsRequired',
          type: 'checkbox',
          label: 'Is NIF required?',
          admin: {
            condition: (_, { nifIsVisible }) => Boolean(nifIsVisible),
            width: '50%',
          },
        },
      ],
      admin: {
        condition: (_, { identificationType }) => identificationType === 'applicant-data',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isVerificationDigitVisible',
          type: 'checkbox',
          label: 'Is Verification Digit visible?',
          admin: { width: '50%' },
        },
        {
          name: 'isVerificationDigitRequired',
          type: 'checkbox',
          label: 'Is Verification Digit required?',
          admin: {
            condition: (_, { isVerificationDigitVisible }) => Boolean(isVerificationDigitVisible),
            width: '50%',
          },
        },
      ],
      admin: {
        condition: (_, { identificationType }) => identificationType === 'applicant-data',
      },
    },
  ],
  labels: {
    singular: 'Dados de Identificação',
    plural: 'Dados de Identificação',
  },
}
