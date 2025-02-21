'use client'

import { ToastProvider } from '@ama-pt/agora-design-system'

const ClientToastWrapper = ({ children }) => {
  return <ToastProvider position="top-right">{children}</ToastProvider>
}

export default ClientToastWrapper
