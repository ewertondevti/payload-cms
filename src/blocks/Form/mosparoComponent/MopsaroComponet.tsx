declare global {
  namespace JSX {
    interface IntrinsicElements {
      mosparo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-uuid'?: string
        'url-api'?: string
        host?: string
        'public-key'?: string
        url?: string
      }
    }
  }
}

const MosparoComponent = () => {
  return (
    <div>
      <mosparo
        project-uuid={process.env.REACT_APP_MOSPARO_PROJECT_UUID}
        url-api={process.env.REACT_APP_MOSPARO_URL_API}
        host={process.env.REACT_APP_NEXT_PUBLIC_MOSPARO_HOST}
        public-key={process.env.REACT_APP_NEXT_PUBLIC_MOSPARO_PUBLIC_KEY}
        url={process.env.REACT_APP_MOSPARO_URL}
      />
    </div>
  )
}
export default MosparoComponent
