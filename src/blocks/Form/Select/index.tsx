import { useEffect, useState } from 'react'
import {
  InputSelect as AgoraInputSelect,
  DropdownOptionProps,
  DropdownOption,
  DropdownSection,
} from '@ama-pt/agora-design-system'
import { Width } from '@/blocks/Form/Width'
import { useFormContext } from 'react-hook-form'

export type SelectProps = {
  id?: string
  name?: string
  value?: string
  type?: 'checkbox' | 'text'
  label: string
  options: { label: string; value: string }[]
  searchable?: boolean
  placeholder?: string
  visibleCount?: number
  searchNoResultsText?: string
  searchInputPlaceholder?: string
  defaultValue?: string
  hideSectionNames?: boolean
  allSelectedLabel?: string
  dropdownAriaLabel?: string
  icon?: string
  hasError?: boolean
  required?: boolean
  disabled?: boolean
  onChange?: ((option: string) => void) | undefined
  width?: number | string
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  name,
  type = 'text',
  label,
  options,
  searchable,
  placeholder,
  visibleCount = 4,
  searchNoResultsText,
  searchInputPlaceholder,
  defaultValue,
  hideSectionNames = false,
  allSelectedLabel = '',
  dropdownAriaLabel,
  icon,
  hasError = false,
  required,
  disabled,
  onChange,
  width,
}) => {
  const { register, setValue } = useFormContext()
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue)

  const onInputSelectChange = async (selected: DropdownOptionProps[]) => {
    if (selected.length > 0) {
      const newValue = selected[0]?.value
      onChange && onChange(newValue)
      setSelectedValue(newValue)
    }
  }

  useEffect(() => {
    name && register(name, { value: selectedValue, required })
  }, [name, register])

  useEffect(() => {
    name && setValue(name, selectedValue)
  }, [name, selectedValue, setValue])

  return (
    <Width width={width}>
      <style>
        {`
          .agora-dropdown.visible {
            max-height: ${(visibleCount ?? 4) * 62}px !important;
            overflow-y: auto !important;
          }
        `}
      </style>
      <AgoraInputSelect
        id={id}
        type={type}
        label={label}
        placeholder={placeholder}
        searchable={searchable}
        searchNoResultsText={searchNoResultsText}
        visibleCount={visibleCount}
        searchInputPlaceholder={searchInputPlaceholder}
        defaultValue={defaultValue}
        hideSectionNames={hideSectionNames}
        allSelectedLabel={allSelectedLabel}
        dropdownAriaLabel={dropdownAriaLabel}
        icon={icon}
        hasError={hasError}
        required={required}
        onChange={onInputSelectChange}
        disabled={disabled}
      >
        <DropdownSection name="options">
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              value={option.value}
              selected={option.value === selectedValue}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownSection>
      </AgoraInputSelect>
    </Width>
  )
}
