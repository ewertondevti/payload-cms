import { Block, Field } from 'payload'

const FieldConfig = (name: string, label: string, required = true, placeholder: string): Field => ({
  name,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (lowercase, no special characters)',
          required: true,
          defaultValue: name,
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder',
          defaultValue: placeholder
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: label
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Obrigatório',
          defaultValue: required
        }
      ],
    },
  ],
})

export const AddressBlock: Block = {
  slug: 'address',
  fields: [
    FieldConfig('residency', 'País de residência', true, "País de residência"),
    FieldConfig('postalCode', 'Código Postal', true, "Código Postal",),
    FieldConfig('location', 'Localidade', true, "Localidade"),
    FieldConfig('address', 'Moarada', true, "Morada"),
    FieldConfig('addressName', 'Localidade', true, "Localidade"),
    FieldConfig('addressFloor', 'Andar (Opcional)', true, "Andar (Opcional)"),
    FieldConfig('addressDoor', 'Porta (Opcional)', true, "Porta (Opcional)"),
    FieldConfig('addressNumber', 'Número / Lote', true, "Número / Lote"),
  ],
  labels: {
    plural: 'Moradas',
    singular: 'Morada',
  },
}
