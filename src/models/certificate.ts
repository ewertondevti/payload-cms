export interface GetCertidaoResponse {
  data: ResponseData
  success: boolean
  errorMessage: string
  statusCode: number
}

export interface ResponseData {
  attachment: Attachment
  status: Status
}

interface Status {
  code: number
  message: string
}

interface Attachment {
  filename: string
  mimetype: string
  bytes: string
}
