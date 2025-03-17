import { Block, Field } from 'payload';

const identificationType: Field = {
 type: 'select',
 label: 'Tipo de Identificação',
 name: 'identificationType',
 options: [
  {
   label: 'Morada',
   value: 'identification-data',
  },
  {
   label: 'Identificação pai/mae',
   value: 'parent-data',
  },
  {
   label: 'Local e data do casamento',
   value: 'place-date',
  },
  {
   label: 'Morada de casamento',
   value: 'wedding-data',
  },
 ],
 defaultValue: 'identification-data',
 admin: { width: '50%' },
};

export const AddressDataBlock: Block = {
 slug: 'addressdata',
 fields: [
  {
   type: 'row',
   fields: [
    {
     name: 'title',
     type: 'text',
     label: 'Section title',
     defaultValue: 'Morada',
     admin: { width: '50%' },
    },
    identificationType,
   ],
  },
 ],
 labels: {
  singular: 'Morada',
  plural: 'Moradas',
 },
};