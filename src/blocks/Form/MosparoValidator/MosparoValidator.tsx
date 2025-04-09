import React, { useRef } from 'react'

interface MosparoValidatorProps {
  submitToken: string | null
  onVerified?: (info: any) => void
}

const MosparoValidator: React.FC<MosparoValidatorProps> = ({ submitToken, onVerified }) => {
  const mosparoRef = useRef<HTMLDivElement>(null)

  const MOSPARO_CONFIG = {
    publicKey: process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY,
    host: process.env.NEXT_PUBLIC_MOSPARO_HOST,
    mosparoUUID: process.env.NEXT_PUBLIC_MOSPARO_PROJECT_UUID,
  }

  const onLoad = () => {
    if (window.mosparo && mosparoRef.current) {
      try {
        new window.mosparo(
          'mosparo-box',
          MOSPARO_CONFIG.host,
          MOSPARO_CONFIG.mosparoUUID,
          MOSPARO_CONFIG.publicKey,
          {
            loadCssResource: true,
          },
        )
      } catch (error) {
        console.error('Failed to initialize Mosparo:', error)
      }
    }
  }

  return (
    <>
      <script src={`${MOSPARO_CONFIG.host}/build/mosparo-frontend.js`} defer onLoad={onLoad} />

      <link
        rel="stylesheet"
        href={`${MOSPARO_CONFIG.host}/resources/${MOSPARO_CONFIG.mosparoUUID}.css`}
      />

      <div id="mosparo-box" ref={mosparoRef} />
    </>
  )
}

export default MosparoValidator
