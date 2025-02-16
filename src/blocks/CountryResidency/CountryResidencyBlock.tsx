import { Block, Field } from 'payload';

const placeholderField: Field = {
 name: 'placeholder',
 type: 'text',
 label: 'Placeholder',
 defaultValue: '',
};

const requiredField: Field = {
 name: 'required',
 type: 'checkbox',
 label: 'Required ?',
 defaultValue: true,
};

export const CountryResidencyBlock: Block = {
 slug: 'countryresidency',
 labels: {
  singular: 'Residência',
  plural: 'Residências',
 },
 fields: [
  {
   name: 'country',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder do País',
     defaultValue: 'Selecione o país',
    },
    {
     name: 'options',
     type: 'array',
     label: 'Opções do País',
     fields: [
      {
       name: 'label',
       type: 'text',
       required: true,
      },
      {
       name: 'value',
       type: 'text',
       required: true,
      },
     ],
    },
    {
     ...requiredField,
    },
   ],
  },
  {
   name: 'postalCode',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder do Código Postal',
     defaultValue: '0000-000',
    },
    {
     ...requiredField,
    },
   ],
  },
  {
   name: 'locality',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder da Localidade',
     defaultValue: 'Insira a localidade',
    },
    {
     ...requiredField,
    },
   ],
  },
  {
   name: 'address',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder da Morada',
     defaultValue: 'Insira a morada',
    },
    {
     ...requiredField,
    },
   ],
  },
  {
   name: 'numberLot',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder do Número / Lote',
     defaultValue: 'Insira o número ou lote',
    },
    {
     ...requiredField,
    },
   ],
  },
  {
   name: 'floor',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder do Andar',
     defaultValue: 'Insira o andar (opcional)',
    },
    {
     ...requiredField,
     defaultValue: false,
    },
   ],
  },
  {
   name: 'door',
   type: 'group',
   fields: [
    {
     ...placeholderField,
     label: 'Placeholder da Porta',
     defaultValue: 'Insira a porta (opcional)',
    },
    {
     ...requiredField,
     defaultValue: false,
    },
   ],
  },
 ],
};
