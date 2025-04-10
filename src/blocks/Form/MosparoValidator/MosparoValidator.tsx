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
          { loadCssResource: true },
        )
      } catch (error) {
        console.error('Failed to initialize Mosparo:', error)
      }
    }
  }, [])

  return <div id="mosparo-box" />
}

export default MosparoValidator
