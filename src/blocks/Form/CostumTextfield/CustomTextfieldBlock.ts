import { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: '',
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
  defaultValue: '',
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

const disabled: Field = {
  name: 'disabled',
  type: 'checkbox',
  label: 'Disabled',
}

const readOnly: Field = {
  name: 'readOnly',
  type: 'checkbox',
  label: 'Read Only',
}

const hideLabel: Field = {
  name: 'hideLabel',
  type: 'checkbox',
  label: 'Hide Label',
}

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

const iconField: Field = {
  name: 'icon',
  type: 'text',
  admin: {
    components: {
      Field: 'src/blocks/Form/CostumTextfield/IconSelect',
    },
  },
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  localized: true,
}

export const CustomTextfieldBlock: Block = {
  slug: 'customtext',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
        {
          ...placeholder,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        iconField,
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minLength',
          type: 'number',
          label: 'Minimum Length',
        },
        {
          name: 'maxLength',
          type: 'number',
          label: 'Maximum Length',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'pattern',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Pattern',
        },
        {
          name: 'errorMessage',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Error Message',
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...required,
          admin: {
            width: 'calc(100% / 4)',
          },
        },
        {
          ...disabled,
          admin: {
            width: 'calc(100% / 4)',
          },
        },
        {
          ...readOnly,
          admin: {
            width: 'calc(100% / 4)',
          },
        },
        {
          ...hideLabel,
          admin: {
            width: 'calc(100% / 4)',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Simple Text',
    singular: 'Simple Text',
  },
}
