import type { Block } from 'payload'

const PaymentServiceStepBlock: Block = {
  slug: 'payment-service-steps',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Pagamento',
    },
  ],
}

export default PaymentServiceStepBlock
