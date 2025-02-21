import { Block, Field } from 'payload'

const main: Field = {
  name: 'main',
  type: 'checkbox',
  label: 'Título principal?',
  required: true
}

const title: Field = {
  name: 'title',
  type: 'text',
  label: 'Título',
  required: true
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  label: 'Subtítulo',
  required: false
}

export const HeaderBlock: Block = {
  slug: 'header',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...main,
          admin: {
            width: '20%',
          },
        },
        {
          ...title,
          admin: {
            width: '40%',
          },
        },
        {
          ...subtitle,
          admin: {
            width: '40%',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Titulos',
    singular: 'Titulo',
  },
}
