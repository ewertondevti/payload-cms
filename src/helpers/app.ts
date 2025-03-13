export const addBase64Prefix = (base64file: string, mimeType: string) =>
  `data:${mimeType};base64,${base64file}`
