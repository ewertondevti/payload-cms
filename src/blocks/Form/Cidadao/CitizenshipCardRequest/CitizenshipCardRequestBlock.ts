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
    {
      type: 'text',
      name: 'apiUrl',
      label: 'URL of API for consulates and service stations',
      required: true,
    },
    {
      type: 'group',
      name: 'parentDataRef',
      label: 'Parent form names (must match names on respective forms)',
      fields: [
        {
          type: 'text',
          name: 'first',
          label: 'First Parent',
          required: true,
          defaultValue: 'firstparent',
        },
        {
          type: 'text',
          name: 'second',
          label: 'Second Parent',
          required: true,
          defaultValue: 'secondparent',
        },
      ],
    },
  ],
  labels: {
    plural: 'Citizenship Card Requests',
    singular: 'Citizenship Card Request',
  },
}
