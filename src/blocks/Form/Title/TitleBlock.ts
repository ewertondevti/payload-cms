import { Block } from 'payload'

export const TitleBlock: Block = {
  slug: 'title',
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Title',
      localized: true,
    },
  ],
}
