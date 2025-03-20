import { Block } from 'payload'

export const TitleBlock: Block = {
  slug: 'title',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
          defaultValue: '',
        },
        {
          name: 'htmlTag',
          type: 'select',
          label: 'HTML Tag',
          required: true,
          defaultValue: 'h1',
          options: [
            { label: 'h1', value: 'h1' },
            { label: 'h2', value: 'h2' },
            { label: 'h3', value: 'h3' },
            { label: 'h4', value: 'h4' },
            { label: 'h5', value: 'h5' },
          ],
        },
      ],
    },
    {
      name: 'sublabel',
      label: 'Sub label',
      type: 'text',
    },
  ],
}
