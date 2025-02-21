import React from 'react'

interface ReadOnlyTextFieldProps {
  label?: string
  value: string
}

const ReadOnlyTextField = ({ label, value }: ReadOnlyTextFieldProps) => {
  return (
    <div className="flex flex-col gap-4 relative">
      {label && (
        <label className="font-bold text-[16px] leading-[28px] text-[#021C51]">{label}</label>
      )}
      <span className="text-[24px] leading-[36px] text-[#2B363C] font-light">{value}</span>
    </div>
  )
}

export default ReadOnlyTextField
