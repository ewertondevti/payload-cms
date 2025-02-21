import type { CollectionConfig } from 'payload'

import AboutTheServiceBlock from '@/blocks/AboutTheServiceBlock'
import ContentServiceStepsBlock from '@/blocks/ContentServiceStepsBlock'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { slugField } from '@/fields/slug'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import FormServiceStepBlock from '@/blocks/FormServiceStepBlock/FormServiceStepBlock'
import PaymentServiceStepBlock from '@/blocks/Payment/PaymentServiceStepBlock'
import SubmissionServiceStepBlock from '@/blocks/Submission/SubmissionServiceStepBlock'
import SummaryServiceStepBlock from '@/blocks/Summary/SummaryServiceStepBlock'
import ExemploServiceStepBlock from '@/blocks/ExemploServiceStep/ExemploServiceStepBlock'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title', 'api'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'area',
      type: 'relationship',
      relationTo: 'areas',
      hasMany: false,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'abouttheservice',
          label: 'About The Service',
          fields: [
            {
              name: 'aboutTheService',
              type: 'blocks',
              blocks: [AboutTheServiceBlock],
            },
          ],
        },
        {
          name: 'steps',
          label: 'Steps',
          fields: [
            {
              name: 'steps',
              type: 'blocks',
              blocks: [
                ContentServiceStepsBlock,
                FormServiceStepBlock,
                PaymentServiceStepBlock,
                SubmissionServiceStepBlock,
                SummaryServiceStepBlock,

                ExemploServiceStepBlock,
              ],
            },
          ],
        },
        {
          name: 'relatedservices',
          label: 'Related Services',
          fields: [
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
          ],
        },
        {
          name: 'configuration',
          label: 'Configuration',
          fields: [
            {
              name: 'authenticated',
              type: 'checkbox',
              defaultValue: true,
              label: 'Require Authentication',
            },
            {
              name: 'schedulable',
              type: 'checkbox',
              defaultValue: true,
              label: 'Schedulable',
            },
            {
              name: 'informationPreloadAPI',
              label: 'Information Preload API',
              type: 'text',
              required: false,
              admin: {
                description:
                  'URL of the API that will preload information that can be used in the form.',
                placeholder: 'https://api.example.com/preload',
              },
            },
            {
              name: 'formSubmissionBusinessValidationAPI',
              label: 'Form Submission Business Validation API',
              type: 'text',
              required: false,
              admin: {
                description: 'URL of the API that will validate the form submission.',
                placeholder: 'https://api.example.com/validate',
              },
            },
            {
              name: 'formSubmissionURL',
              label: 'Form Submission URL',
              type: 'text',
              required: true,
              admin: {
                description: 'URL of the API that will receive the form submission.',
                placeholder: 'https://api.example.com/submit',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
}
