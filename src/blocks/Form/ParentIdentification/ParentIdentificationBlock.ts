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

export const ParentIdentificationBlock: Block = {
 slug: 'parentidentification',
 labels: {
  singular: 'Identificação do Pai/Mãe',
  plural: 'Identificações dos Pais'
 },
 fields: [
  createFieldConfig('firstName', 'Nome(s) próprio(s)'),
  createFieldConfig('lastName', 'Apelido(s)'),
  createFieldConfig('documentType', 'Documento de Identificação'),
  createFieldConfig('documentNumber', 'Número do documento', false),
  createFieldConfig('verificationDigit', 'Dígito de verificação', false),
  createFieldConfig('gender', 'Gênero'),
  createFieldConfig('maritalStatus', 'Estado civil'),
  createFieldConfig('birthDate', 'Data de nascimento'),
  createFieldConfig('nationality', 'Nacionalidade')
 ]
}