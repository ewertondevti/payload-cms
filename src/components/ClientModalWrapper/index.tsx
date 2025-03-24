'use client'

import { ModalProvider } from '@ama-pt/agora-design-system'

const ClientModalWrapper = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>
}

export default ClientModalWrapper
