import { Block, Field } from "payload"

const createFieldConfig = (name: string, label: string, required = true): Field => ({
 name,
 type: 'group',
 fields: [
  {
   name: 'label',
   type: 'text',
   label: 'Rótulo',
   required: true,
   defaultValue: label
  },
  {
   name: 'placeholder',
   type: 'text',
   label: 'Placeholder',
   required: true
  },
  {
   name: 'required',
   type: 'checkbox',
   label: 'Obrigatório',
   defaultValue: required,
   admin: { hidden: true }
  }
 ]
})

export const ParentAddressBlock: Block = {
 slug: 'parentaddress',
 labels: {
  singular: 'Endereço do Pai/Mãe',
  plural: 'Endereços dos Pais'
 },
 fields: [
  createFieldConfig('countryOfResidence', 'País de residência'),
  createFieldConfig('addressType', 'Tipo de via'),
  createFieldConfig('wayDesignation', 'Designação de via'),
  createFieldConfig('doorNumber', 'Porta'),
  createFieldConfig('floor', 'Andar', false),
  createFieldConfig('side', 'Lado', false),
  createFieldConfig('district', 'Distrito'),
  createFieldConfig('municipality', 'Concelho'),
  createFieldConfig('parish', 'Freguesia'),
  createFieldConfig('postalCode', 'Código Postal')
 ]
}
