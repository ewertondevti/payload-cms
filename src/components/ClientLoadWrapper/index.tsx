'use client'

import { LoaderDialogProvider } from '@ama-pt/agora-design-system'

const ClientLoaderWrapper = ({ children }) => {
  return <LoaderDialogProvider>{children}</LoaderDialogProvider>
}

export default ClientLoaderWrapper
