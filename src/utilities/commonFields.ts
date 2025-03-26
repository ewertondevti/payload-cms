import { Field } from 'payload'

export const nameField: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

export const labelField: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
}
