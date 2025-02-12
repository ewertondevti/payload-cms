import { Block, Field } from 'payload'

const name: Field = {
 name: 'name',
 type: 'text',
 label: "name (lowercase, no special characters)",
 required: true,
 defaultValue: 'pais',
}

const label: Field = {
 name: 'label',
 type: 'text',
 label: 'Label',
 localized: true,
 defaultValue: 'País de residência',
}

export const CountryResidencyBlock: Block = {
 slug: 'country-residency',
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
    {
     ...label,
     admin: {
      width: '50%',
     },
    },
   ],
  },
 ],
 labels: {
  plural: 'Moradas',
  singular: 'Morada',
 },
}