'use client'

import { useEffect } from 'react'

const MosparoValidator = () => {
  const MOSPARO_CONFIG = {
    publicKey: process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY,
    host: process.env.NEXT_PUBLIC_MOSPARO_HOST,
    mosparoUUID: process.env.NEXT_PUBLIC_MOSPARO_PROJECT_UUID,
  }

  useEffect(() => {
    if (window.mosparo) {
      try {
        new window.mosparo(
          'mosparo-box',
          MOSPARO_CONFIG.host,
          MOSPARO_CONFIG.mosparoUUID,
          MOSPARO_CONFIG.publicKey,
          {
            loadCssResource: false, // Já carregamos o CSS manualmente
            language: 'pt_PT',
            allowBrowserValidation: true,
            submitOnValidation: false, // Desativa auto-submit do Mosparo
            customMessages: {
              pt_PT: {
                label: 'Clique - Confirme que não é um robô.',
                errorSpamDetected: 'A sua mensagem foi detetada como spam!',
                errorLockedOut: 'Tentativas a mais. Tente mais tarde.',
                accessibilityCheckingData:
                  'A proteção contra spam está a verificar os seus dados. Por favor, aguarde.',
              },
            },
          },
        )
      } catch (error) {
        console.error('Failed to initialize Mosparo:', error)
      }
    }
  }, [])

  return <div id="mosparo-box" />
}

export default MosparoValidator
