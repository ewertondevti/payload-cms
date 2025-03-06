import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'segundoprogenitor',
}


export const SecondParentBlock: Block = {
  slug: 'secondParent',
  fields: [{
    ...name,
    admin: {
      width: '50%',
    },
  }],
  labels: {
    singular: 'Second Parent',
    plural: 'Second Parents',
  },
}
