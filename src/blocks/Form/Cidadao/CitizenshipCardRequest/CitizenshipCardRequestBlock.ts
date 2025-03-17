import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'citizenshipcardrequest',
}

export const CitizenshipCardRequestBlock: Block = {
  slug: 'citizenshipCardRequest',
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
    plural: 'Citizenship Card Requests',
    singular: 'Citizenship Card Request',
  },
}
