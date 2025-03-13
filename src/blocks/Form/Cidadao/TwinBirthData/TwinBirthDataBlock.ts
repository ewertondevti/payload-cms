import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: 'twinbirthdata',
}

export const TwinBirthDataBlock: Block = {
  slug: 'twinBirthData',
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
    plural: 'Twin Birth Datas',
    singular: 'Twin Birth Data',
  },
}
