import { Block } from "payload";

export const BirthConsultationFormBlock: Block = {
 slug: 'birthbonsultationForm',
 labels: {
  singular: 'Birth Consultation Form',
  plural: 'Birth Consultation Forms',
 },
 fields: [
  {
   name: 'stepTitle',
   label: 'Step Title',
   type: 'text',
   required: true,
   defaultValue: 'Consulta de Nascimento',
   localized: true,
  },
  {
   name: 'form',
   label: 'Select Form',
   type: 'relationship',
   relationTo: 'forms',
   required: true,
  }
 ],
};
