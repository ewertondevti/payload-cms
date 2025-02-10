import { Block, Field } from 'payload'

const title: Field = {
  name: 'title',
  type: 'text',
  label: 'Title',
  required: true,
}

const arrayFields: Field = {
  name: 'fields',
  type: 'array',
  //   labels: {
  //     singular: 'Field',
  //     plural: 'Fields',
  //   },
  fields: [],
}

export const GroupBlock: Block = {
  slug: 'group',
  fields: [title, arrayFields],
}
