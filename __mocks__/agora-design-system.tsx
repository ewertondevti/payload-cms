import React from "react";

export const InputText = React.forwardRef<HTMLInputElement, any>(
  ({ label, feedbackText, hasFeedback, feedbackState, ...props }, ref) => (
    <div>
      <input aria-label={label} ref={ref} {...props} />
      {feedbackText && <span>{feedbackText}</span>}
    </div>
  )
);
