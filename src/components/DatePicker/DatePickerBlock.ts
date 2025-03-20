import type { Block, Field } from 'payload'

const label: Field = {
  name: 'label',
  type: 'text',
  defaultValue: '',
  label: 'Label',
  localized: true,
}

const width: Field = { name: 'width', type: 'number', label: 'Field Width (percentage)' }

const length: Field = {
  name: 'length',
  type: 'number',
  admin: {
    width: 'calc(100% / 3)',
  },
}

const typeOfLength: Field = {
  name: 'typeOfLength',
  type: 'select',
  options: [
    {
      label: 'Day(s)',
      value: 'days',
    },
    {
      label: 'Week(s)',
      value: 'weeks',
    },
    {
      label: 'Month(s)',
      value: 'months',
    },
    {
      label: 'Year(s)',
      value: 'years',
    },
  ],
  admin: {
    width: 'calc(100% / 3)',
  },
}

const beforeOrAfter: Field = {
  name: 'beforeOrAfter',
  type: 'select',
  options: [
    {
      label: 'before current day',
      value: 'before',
    },
    {
      label: 'after current day',
      value: 'after',
    },
  ],

  admin: {
    width: 'calc(100% / 3)',
  },
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const DatePickerBlock: Block = {
  slug: 'datePicker',
  fields: [
    label,
    width,
    {
      type: 'group',
      label: 'Relative Min Date',
      name: 'relativeMinDate',
      fields: [length, typeOfLength, beforeOrAfter],
    },
    {
      type: 'group',
      label: 'Relative Max Date',
      name: 'relativeMaxDate',
      fields: [length, typeOfLength, beforeOrAfter],
    },
    required,
  ],
  labels: {
    plural: 'Date Pickers',
    singular: 'Date Picker',
  },
}
