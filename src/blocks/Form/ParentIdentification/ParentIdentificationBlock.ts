import { Block, Field } from 'payload'

const dateOfBirth: Field = {
  name: 'birthDate',
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Rótulo',
      required: true,
      defaultValue: 'Data de nascimento',
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Obrigatório',
      defaultValue: true,
      admin: { hidden: true },
    },
  ],
}

const createFieldConfig = (
  name: string,
  label: string,
  placeholder: string,
  required = true,
): Field => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Rótulo',
      required: true,
      defaultValue: label,
    },
    {
      name: 'placeholder',
      type: 'text',
      label: 'Placeholder',
      required: true,
      defaultValue: placeholder,
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Obrigatório',
      defaultValue: required,
      admin: { hidden: true },
    },
  ],
})

export const ParentIdentificationBlock: Block = {
  slug: 'parentidentification',
  labels: {
    singular: 'Identificação do Pai/Mãe',
    plural: 'Identificações dos Pais',
  },
  fields: [
    createFieldConfig('firstName', 'Nome(s) próprio(s)', 'Indique o(s) nome(s) próprio(s)'),
    createFieldConfig('lastName', 'Apelido(s)', 'Indique o(s) apelido(s)'),
    createFieldConfig('documentType', 'Documento de Identificação', 'Selecione'),
    createFieldConfig(
      'documentNumber',
      'Número do documento',
      'Indique o número do documento',
      false,
    ),
    createFieldConfig(
      'verificationDigit',
      'Dígito de verificação',
      'Indique o digito de verificação',
      false,
    ),
    createFieldConfig('gender', 'Gênero', 'Selecione'),
    createFieldConfig('maritalStatus', 'Estado civil', 'Selecione uma opção'),
    dateOfBirth,
    createFieldConfig('nationality', 'Nacionalidade', 'Selecione uma opção'),
  ],
}
