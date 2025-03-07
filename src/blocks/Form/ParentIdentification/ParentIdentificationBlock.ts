import { Block, Field } from 'payload'

export const ParentIdentificationBlock: Block = {
 slug: 'parentidentification',
 labels: {
  singular: 'Parent Identification',
  plural: 'Parent Identifications',
 },
 fields: [
  {
   name: 'parentName',
   label: 'Parent Name',
   type: 'text',
   required: true,
  }
 ],
}