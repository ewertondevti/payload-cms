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
 label: 'Required?',
 defaultValue: true,
};

const inputLabelField: Field = {
 name: 'label',
 type: 'text',
 label: 'Input Label',
 required: true,
 defaultValue: 'Default Label',
};

const inputWidthField: Field = {
 name: 'width',
 type: 'select',
 label: 'Input Width',
 options: [
  { label: '100%', value: '100%' },
  { label: '50%', value: '50%' },
  { label: '33%', value: '33%' },
  { label: '25%', value: '25%' },
 ],
 defaultValue: '100%',
};

export const CountryResidencyBlock: Block = {
 slug: 'countryresidency',
 labels: {
  singular: 'Residency',
  plural: 'Residencies',
 },
 fields: [
  {
   name: 'country',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Country' },
    { ...inputWidthField, defaultValue: '100%' },
    {
     ...placeholderField,
     label: 'Country Placeholder',
     defaultValue: 'Select a country',
    },
    {
     name: 'options',
     type: 'array',
     label: 'Country Options',
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
    { ...requiredField },
   ],
  },
  {
   name: 'postalCode',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Postal Code' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Postal Code Placeholder', defaultValue: '0000-000' },
    { ...requiredField },
   ],
  },
  {
   name: 'locality',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Locality' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Locality Placeholder', defaultValue: 'Enter locality' },
    { ...requiredField },
   ],
  },
  {
   name: 'address',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Address' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Address Placeholder', defaultValue: 'Enter address' },
    { ...requiredField },
   ],
  },
  {
   name: 'numberLot',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Number / Lot' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Number / Lot Placeholder', defaultValue: 'Enter number or lot' },
    { ...requiredField },
   ],
  },
  {
   name: 'floor',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Floor' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Floor Placeholder', defaultValue: 'Enter floor (optional)' },
    { ...requiredField, defaultValue: false },
   ],
  },
  {
   name: 'door',
   type: 'group',
   fields: [
    { ...inputLabelField, defaultValue: 'Door' },
    { ...inputWidthField, defaultValue: '100%' },
    { ...placeholderField, label: 'Door Placeholder', defaultValue: 'Enter door (optional)' },
    { ...requiredField, defaultValue: false },
   ],
  },
 ],
};