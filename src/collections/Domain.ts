// import type { CollectionConfig } from 'payload'

// import {
//   MetaDescriptionField,
//   MetaImageField,
//   MetaTitleField,
//   OverviewField,
//   PreviewField,
// } from '@payloadcms/plugin-seo/fields'

// import type { Block } from 'payload'

// export const ValorBlock: Block = {
//     slug: 'Valor',
//     fields: [
//         {
//             name: 'id',
//             type: 'text',
//             required: true,
//         },
//         {
//             name: 'name',
//             type: 'text',
//             required: true,
//         },
//     ]
// }




// export const Domain: CollectionConfig = {
//   slug: 'domains',
//   admin: {
//     defaultColumns: ['name', 'title', 'api'],
//     useAsTitle: 'name'
//   },
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//       localized: true,
//     },
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//       localized: true,
//     },
//     {
//       name: 'description',
//       type: 'textarea',
//       required: true,
//       localized: true,
//     },
    
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           name: 'values',
//           label: 'Values',
//           fields: [
//             {
//               name: 'value',
//               type: 'blocks',
//               required: true,
//               blocks: [ValorBlock]
//             },
//           ],
//         },



//         {
//           name: 'meta',
//           label: 'SEO',
//           fields: [
//             OverviewField({
//               titlePath: 'meta.title',
//               descriptionPath: 'meta.description',
//               imagePath: 'meta.image',
//             }),
//             MetaTitleField({
//               hasGenerateFn: true,
//             }),
//             MetaImageField({
//               relationTo: 'media',
//             }),

//             MetaDescriptionField({}),
//             PreviewField({
//               // if the `generateUrl` function is configured
//               hasGenerateFn: true,

//               // field paths to match the target field for data
//               titlePath: 'meta.title',
//               descriptionPath: 'meta.description',
//             }),
//           ],
//         },
//       ],
//     },
//   ],
// }
