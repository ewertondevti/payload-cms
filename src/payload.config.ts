// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp' // editor-import

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from 'src/payload-types'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import Users from './collections/Users'
import { seedHandler } from './endpoints/seedHandler'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'

import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import { fileURLToPath } from 'url'
import { AddressBlock } from './blocks/Form/Address/AddressBlock'
import { BirthCertificateBlock } from './blocks/Form/BirthCertificateData/BirthCertificateDataBlock'
import { BirthdateBlock } from './blocks/Form/Birthdate/BirthdateBlock'
import { BirthplaceBlock } from './blocks/Form/Birthplace/BirthplaceBlock'
import { ContactBlock } from './blocks/Form/ContactData/ContactDataBlock'
import { CustomTextfieldBlock } from './blocks/Form/CostumTextfield/CustomTextfieldBlock'
import { CustomMessageBlock } from './blocks/Form/CustomMessage/CustomMessageBlock'
import { CustomNumberBlock } from './blocks/Form/CustomNumber/CustomNumberBlock'
import { DropdownBlock } from './blocks/Form/Dropdown/DropdownBlock'
import { GroupBlock } from './blocks/Form/Group/GroupBlock'
import { HeaderBlock } from './blocks/Form/Header/HeaderBlock'
import { IdBlock } from './blocks/Form/IdData/IdDataBlock'
import { IdentificationDataBlock } from './blocks/Form/IdentificationData/IdentificationDataBlock'
import { NationalityBlock } from './blocks/Form/Nationality/NationalityBlock'
import { NifBlock } from './blocks/Form/Nif/NifBlock'
import { PhoneNumberBlock } from './blocks/Form/PhoneNumber/PhoneNumberBlock'
import { PreLoadExample1Block } from './blocks/Form/PreloadExample1/PreLoadExample1'
import { RadioButtonBlock } from './blocks/Form/RadioButtonGroup/RadioButtonGroupBlock'
import { RequestorBlock } from './blocks/Form/RequestorData/RequestorDataBlock'
import { SelectWithApiBlock } from './blocks/Form/SelectWithAPI/SelectWithApiBlock'
import { TextAreaBlock } from './blocks/Form/Textarea/TextAreaBlock'
import { TitleBlock } from './blocks/Form/Title/TitleBlock'
import { FlexRadioButtonGroupBlock } from './blocks/Form/Cidadao/FlexRadioButtonGroup/FlexRadioButtonGroupBlock'
import { Areas } from './collections/Areas'
import { LifeCycles } from './collections/LifeCycles'
import { Services } from './collections/Services'
import { myRouteHandler } from './endpoints/my-route/route'
import localization from './i18n/localization'
import { BirthConsultationBlock } from './blocks/Form/BirthConsultation/BirthConsultationBlock'
import { ParentIdentificationBlock } from './blocks/Form/ParentIdentification/ParentIdentificationBlock'
import { ParentAddressBlock } from './blocks/Form/ParentAddress/ParentAddressBlock'
import { SecondParentBlock } from './blocks/Form/Cidadao/SecondParent/SecondParentBlock'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      afterDashboard: ['@/components/AfterDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Areas, Categories, LifeCycles, Media, Pages, Posts, Services, Users],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      handler: seedHandler,
      method: 'get',
      path: '/seed',
    },
    {
      path: '/my-route',
      method: 'get',
      handler: myRouteHandler,
    },
  ],
  globals: [Header, Footer],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['categories'],
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    formBuilderPlugin({
      fields: {
        //payment: false,
        message: false,
        text: false,
        number: false,
        state: false,
        select: false,
        CustomMessageBlock,
        CustomNumberBlock,
        NifBlock,
        RadioButtonBlock,
        CustomTextfieldBlock,
        AddressBlock,
        BirthCertificateBlock,
        ContactBlock,
        IdBlock,
        RequestorBlock,
        HeaderBlock,
        DropdownBlock,
        NationalityBlock,
        PhoneNumberBlock,
        PreLoadExample1Block,
        BirthdateBlock,
        TextAreaBlock,
        GroupBlock,
        TitleBlock,
        SelectWithApiBlock,
        IdentificationDataBlock,
        BirthplaceBlock,
        BirthConsultationBlock,
        ParentAddressBlock,
        ParentIdentificationBlock,
        FlexRadioButtonGroupBlock,
        SecondParentBlock,
        BirthConsultationBlock,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    searchPlugin({
      collections: ['posts'],
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({ defaultFields }) => {
          return [...defaultFields, ...searchFields]
        },
      },
    }),
    payloadCloudPlugin(), // storage-adapter-placeholder
  ],
  localization,
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
