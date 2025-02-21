import React from 'react'

interface ReadOnlyTextFieldProps {
  label?: string
  value: string
  light?: boolean
}

const ReadOnlyTextFieldBorder = ({ label, value, light }: ReadOnlyTextFieldProps) => {
  return (
    <div className="flex flex-col gap-2 relative w-full">
      {label && (
        <label className="font-bold text-[16px] leading-[28px] text-[#2B363C]">{label}</label>
      )}
      <div className="w-full pb-[16px] border-b-2 border-[#E1E4EA]">
        <span
          className={
            light
              ? 'max-w-[512px] block font-light text-[24px] leading-[36px] text-[#2B363C]'
              : 'max-w-[512px] block text-[16px] leading-[28px] text-[#2B363C]'
          }
        >
          {value}
        </span>
      </div>
    </div>
  )
}

export default ReadOnlyTextFieldBorder
