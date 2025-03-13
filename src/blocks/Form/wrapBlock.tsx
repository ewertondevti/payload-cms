import { JSX } from 'react'

const wrapBlock = <T,>(Block: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    return (
      <div className="flex flex-wrap gap-32 w-full">
        <Block {...props} />
      </div>
    )
  }
}

export default wrapBlock
