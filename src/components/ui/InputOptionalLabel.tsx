import { cn } from 'src/utilities/cn'
import * as React from 'react'

export interface InputOptionalLabelProps extends React.ComponentProps<'span'> {
  label?: string;
}

const InputOptionalLabel = React.forwardRef<HTMLSpanElement, InputOptionalLabelProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <span {...props} ref={ref} className={cn(className, "text-[#64718B]")}>
        {label || "(Opcional)"}
      </span>
    )
  },
)
InputOptionalLabel.displayName = 'OptionalLabel'

export { InputOptionalLabel}