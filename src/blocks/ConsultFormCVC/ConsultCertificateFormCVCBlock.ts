import { Block } from 'payload'

const ConsultCertificateFormCVCServiceStepBlock: Block = {
  slug: 'consult-certificate-form-service-step',
  labels: {
    plural: 'Formulário para consultas de certidões',
    singular: 'Formulário para consulta de certidão',
  },
  fields: [
    {
      name: 'title',
      label: 'Step title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Insira os dados necessários à consulta. Valide o código de verificação.',
    },
    {
      name: 'titlepage',
      label: 'Title page',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Consulta de Certidão',
    },
    {
      name: 'subtitlepage',
      label: 'Sub title page',
      type: 'text',
      localized: true,
      defaultValue: 'Aceda à certidão sempre atualizada.',
    },
  ],
}

export default ConsultCertificateFormCVCServiceStepBlock
