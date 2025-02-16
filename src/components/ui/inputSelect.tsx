import { ReactElement, useState, useId, Children, isValidElement } from 'react'
import {
  InputSelect as AgoraInputSelect,
  DropdownOptionProps,
  DropdownSectionProps,
  DropdownOption,
  DropdownSection,
} from '@ama-pt/agora-design-system'

type InputSelectProps = {
  id: string
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
  className?: string;
  disabled?: boolean
  onChange?: ((option: string) => void) | undefined
}

export const InputSelect: React.FC<InputSelectProps> = ({
  id,
  value,
  type = 'text',
  label,
  options,
  searchable,
  className,
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
}) => {
  const generatedId = useId()

  const [dropdownOptions, setDropdownOptions] = useState<ReactElement<DropdownSectionProps>[]>([
    <DropdownSection label="País" name="pais" key={`country-${generatedId}-${0}`}>
      {options.map((option) => (
        <DropdownOption key={option.value} value={option.value} selected={option.value === value}>
          {option.label}
        </DropdownOption>
      ))}
    </DropdownSection>,
  ])

  const onInputSelectChange = (selected: DropdownOptionProps[]) => {
    if (selected.length > 0) {
      onChange && onChange(selected[0]?.value)
    }

    const newSections = dropdownOptions.map((s) => {
      const sectionKey = `country-${generatedId}-${0}`

      return (
        <DropdownSection {...s.props} key={sectionKey}>
          {Children.toArray(s.props.children).map((item, sectionOptionIndex) => {
            const sectionOptionKey = `country-${generatedId}-${0}-${sectionOptionIndex}`

            if (isValidElement<DropdownOptionProps>(item)) {
              const selectedValue = selected.some((i) => i.value === item.props.value)
              return (
                <DropdownOption {...item.props} selected={selectedValue} key={sectionOptionKey} />
              )
            }

            return <></>
          })}
        </DropdownSection>
      )
    })
    setDropdownOptions(newSections)
  }
  console.log("🔎 Valor recebido pelo InputSelect:", value);

  return (
    <>
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
        value={value}
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
        className={className}
        hasError={hasError}
        required={required}
        onChange={onInputSelectChange}
        disabled={disabled}
      >
        {dropdownOptions}
      </AgoraInputSelect>
    </>
  )
}
