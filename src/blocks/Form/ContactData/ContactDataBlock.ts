import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'contacto',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  defaultValue: 'Contacto',
}

export const ContactBlock: Block = {
  slug: 'contactData',
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
    plural: 'Contactos',
    singular: 'Contacto',
  },
}
