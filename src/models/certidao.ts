export interface GetCertidaoResponse {
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
