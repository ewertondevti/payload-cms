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
  {
   type: 'row',
   fields: [
    {
     name: 'nifIsVisible',
     type: 'checkbox',
     label: 'Is NIF visible?',
     admin: { width: '50%' },
    },
    {
     name: 'nifIsRequired',
     type: 'checkbox',
     label: 'Is NIF required?',
     admin: {
      condition: (_, { nifIsVisible }) => Boolean(nifIsVisible),
      width: '50%',
     },
    },
   ],
   admin: {
    condition: (_, { identificationType }) => identificationType === 'applicant-data',
   },
  },
  {
   type: 'group',
   name: 'parentAddress',
   label: 'Configuração de Endereço',
   fields: [
    {
     type: 'row',
     fields: [
      {
       name: 'countryOfResidence',
       type: 'text',
       label: 'Rótulo País',
       defaultValue: 'País de residência',
       admin: { width: '50%' },
      },
      {
       name: 'addressType',
       type: 'text',
       label: 'Rótulo Tipo de Endereço',
       defaultValue: 'Tipo de via',
       admin: { width: '50%' },
      },
     ],
    },
    {
     type: 'row',
     fields: [
      {
       name: 'wayDesignation',
       type: 'text',
       label: 'Rótulo Designação da Via',
       defaultValue: 'Designação da via',
       admin: { width: '50%' },
      },
      {
       name: 'doorNumber',
       type: 'text',
       label: 'Rótulo Número da Porta',
       defaultValue: 'Número da porta',
       admin: { width: '50%' },
      },
     ],
    },
   ],
  },
 ],
 labels: {
  singular: 'Morada',
  plural: 'Moradas',
 },
};