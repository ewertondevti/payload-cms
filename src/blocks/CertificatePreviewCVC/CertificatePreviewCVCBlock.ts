import { Block } from 'payload'

const CertificatePreviewCVCServiceStepBlock: Block = {
  slug: 'certificate-preview-cvc',
  labels: {
    plural: 'Pré-visualização das consultas de certidões',
    singular: 'Pré-visualização da consulta de certidão',
  },
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
    {
      name: 'apiurl',
      label: 'URL da API para buscar a certidão',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'URL of the API that will receive the request.',
        placeholder: 'https://api.example.com/consult',
      },
    },
  ],
}

export default CertificatePreviewCVCServiceStepBlock
