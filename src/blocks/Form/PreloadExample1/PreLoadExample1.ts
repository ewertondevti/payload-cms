import { Block, Field } from 'payload'

// import { fields } from '@payloadcms/plugin-form-builder'

const name: Field = {
    name: 'name',
    type: 'text',
    label: 'Name (lowercase, no special characters)',
    required: true,
    defaultValue: 'NIF',
  }
  
  const label: Field = {
    name: 'label',
    type: 'text',
    label: 'Label',
    localized: true,
    defaultValue: 'NIF'
  }
  
  const required: Field = {
    name: 'required',
    type: 'checkbox',
    label: 'Required',
  }
  
  const width: Field = {
    name: 'width',
    type: 'number',
    label: 'Field Width (percentage)',
  }

export const PreLoadExample1Block: Block = {
    slug: 'preLoadExample1',
    fields: [
        {
            name: 'simulatePreload',
            type: 'checkbox',
            label: 'Simulate Preload',
        },
        // {
        //     name: 'lockFieldsAfterPreload',
        //     type: 'checkbox',
        //     label: 'Lock Fields After Preload',
        // },
    //   {
    //     type: 'row',
    //     fields: [
    //       {
    //         ...name,
    //         admin: {
    //           width: '50%',
    //         },
    //       },
    //       {
    //         ...label,
    //         admin: {
    //           width: '50%',
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     type: 'row',
    //     fields: [
    //       {
    //         ...width,
    //         admin: {
    //           width: '50%',
    //         },
    //       },
    //       {
    //         name: 'defaultValue',
    //         type: 'text',
    //         admin: {
    //           width: '50%',
    //         },
    //         label: 'Default Value',
    //         localized: true,
    //       },
    //     ],
    //   },
    //   required,
    ],
    labels: {
      plural: 'PreLoadExample1 Fields',
      singular: 'PreLoadExample1 Field',
    },
  }