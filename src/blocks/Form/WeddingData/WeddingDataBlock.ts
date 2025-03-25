import { nameField } from '@/utilities/commonFields'
import { Block, Field } from 'payload'

export const WeddingDataBlock: Block = {
  slug: 'weddingData',
  fields: [
    { ...nameField, defaultValue: 'weddingdata' } as Field,
    {
      type: 'group',
      name: 'partnerDataRef',
      label: 'Partner form names (must match names on respective forms)',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'first',
              label: 'First Partner',
              required: true,
              defaultValue: 'firstpartner',
            },
            {
              type: 'text',
              name: 'second',
              label: 'Second Partner',
              required: true,
              defaultValue: 'secondpartner',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Wedding Datas',
    singular: 'Wedding Data',
  },
}
