export type PayloadBody = {
  submitToken: string
  validationToken: string
  formData: any
}

export type ValidationFormResponse = {
  valid: boolean
  data: { valid: boolean; validationToken: string }
}
