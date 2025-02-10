export interface IPayloadForm {
  id: number
  title: string
  fields: Field[]
  submitButtonLabel: string
  confirmationType: string
  confirmationMessage: ConfirmationMessage
  redirect: Redirect
  emails: string[]
  updatedAt: string
  createdAt: string
}

interface Redirect {
  url: null
}

interface ConfirmationMessage {
  root: Root
}

interface Root {
  type: string
  format: string
  indent: number
  version: number
  children: Child2[]
  direction: string
}

interface Child2 {
  tag: string
  type: string
  format: string
  indent: number
  version: number
  children: Child[]
  direction: string
}

interface Child {
  mode: string
  text: string
  type: string
  style: string
  detail: number
  format: number
  version: number
}

interface Field {
  id: string
  name: string
  label: string
  width: number
  required: boolean
  blockName: null
  blockType: string
}

export type Option = { label: string; value: string }
