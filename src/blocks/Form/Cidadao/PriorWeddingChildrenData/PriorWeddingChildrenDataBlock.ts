import { Block, Field } from 'payload'
import { AtomicField } from '../types'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'priorweddingchildren',
}

export const PriorWeddingChildrenDataBlock: Block = {
  slug: 'priorWeddingChildrenData',
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
      ],
    },
  ],
  labels: {
    plural: 'Prior Wedding Children Datas',
    singular: 'Prior Wedding Children Data',
  },
}
