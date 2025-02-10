'use client'
import { SelectInput, useField } from '@payloadcms/ui'
import { allIcons } from '@ama-pt/agora-design-system'

const CustomSelect: React.FC<{ path: string }> = ({ path }) => {
  const inputStyle = {
    '--field-width': '50%',
    width: '100%',
  } as React.CSSProperties

  const { value, setValue } = useField<string>({ path })
  const options = allIcons.map((iconName) => ({
    label: iconName,
    value: iconName,
  }))
  return (
    <SelectInput
      path={path}
      label="Icon"
      name={path}
      value={value}
      onChange={(e) =>
        setValue(e ? (Array.isArray(e) ? e.map((option) => option.value).join(', ') : e.value) : '')
      }
      options={options}
      style={inputStyle}
    />
  )
}

export default CustomSelect
