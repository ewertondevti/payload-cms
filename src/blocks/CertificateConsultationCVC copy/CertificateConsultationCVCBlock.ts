import { Block } from 'payload'

const CertificateConsultationCVCServiceStepBlock: Block = {
  slug: 'certificate-consultation-cvc',
  fields: [
    {
      name: 'title',
      label: 'Step title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Consulte a certidão.',
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

export default CertificateConsultationCVCServiceStepBlock
