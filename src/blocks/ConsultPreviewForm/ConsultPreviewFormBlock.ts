import { Block } from 'payload'

const ConsultPreviewFormBlock: Block = {
 slug: 'consultpreviewform',
 fields: [
  {
   name: 'title',
   label: 'Step title',
   type: 'text',
   required: true,
   localized: true,
  },
  {
   name: 'titlepage',
   label: 'Title page',
   type: 'text',
   required: true,
   localized: true,
  },
  {
   name: 'subtitlepage',
   label: 'Sub title page',
   type: 'text',
   localized: true,
  },
 ],
}

export default ConsultPreviewFormBlock
