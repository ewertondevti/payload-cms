import { Block, Field } from 'payload'
import { ParentIdentificationBlock } from '../../ParentIdentification/ParentIdentificationBlock'
import { ContactBlock } from '../../ContactData/ContactDataBlock'
import { FiliationBlock } from '../../Filiation/FiliationBlock'
const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'segundoprogenitor',
}

export const SecondParentBlock: Block = {
  slug: 'secondParent',
  fields: [
    {
      ...name,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'identification',
      type: 'group',
      fields: ParentIdentificationBlock.fields,
    },
    {
      name: 'filiation',
      type: 'group',
      fields: FiliationBlock.fields,
    },
    {
      name: 'contact',
      type: 'group',
      fields: ContactBlock.fields,
    },
  ],
  labels: {
    singular: 'Second Parent',
    plural: 'Second Parents',
  },
}
