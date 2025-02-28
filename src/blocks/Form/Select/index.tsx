'use client'

import {
  DropdownOption,
  DropdownOptionProps,
  DropdownSection,
  DropdownSectionProps,
  InputSelect,
  InputSelectProps,
} from '@ama-pt/agora-design-system'
import classNames from 'classnames'
import { Children, FC, isValidElement, ReactElement, useEffect, useId, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

export type SelectProps = InputSelectProps &
  UseFormReturn & { width: number; options: { label: string; value: any }[] }

export const Select: FC<SelectProps> = ({ setValue, className, width, options, ...props }) => {
  const [sections, setSections] = useState<ReactElement<DropdownSectionProps>[]>([])

  const generatedId = useId()

  useEffect(() => {
    const newSections = [
      <DropdownSection key={`my-input-select-${generatedId}-${0}`} name="Countries">
        {options.map(({ label, value }) => (
          <DropdownOption key={`my-input-select-${value}-${0}-0`} value={value}>
            {label}
          </DropdownOption>
        ))}
      </DropdownSection>,
    ]

    setSections(newSections)
  }, [options])

  const containerClassName = classNames(`h-[${(props.visibleCount ?? 4) * 62}px]`, {
    'text-white bg-[var(--color-primary-900)]': props.darkMode,
  })

  const onInputSelectChange = (selected: DropdownOptionProps[]) => {
    const newSections = sections.map((s) => {
      const sectionKey = `my-input-select-${generatedId}-${0}`

      return (
        <DropdownSection {...s.props} key={sectionKey}>
          {Children.toArray(s.props.children).map((item, sectionOptionIndex) => {
            const sectionOptionKey = `my-input-select-${generatedId}-${0}-${sectionOptionIndex}`

            if (isValidElement<DropdownOptionProps>(item)) {
              const selectedValue = !!selected.find((i) => i.value === item.props.value)

              if (selectedValue) setValue(props.name!, item.props.value)

              return (
                <DropdownOption {...item.props} selected={selectedValue} key={sectionOptionKey} />
              )
            }

            return <></>
          })}
        </DropdownSection>
      )
    })

    setSections(newSections)
  }

  return (
    <div className={containerClassName} style={{ width: `calc(${width}% - 16px)` }}>
      <style>
        {`
          .agora-dropdown.visible {
            max-height: ${(props.visibleCount ?? 4) * 62}px !important;
            overflow-y: auto !important;
          }
        `}
      </style>

      <InputSelect
        {...props}
        {...props.register(props.name!, { required: props.required })}
        onChange={onInputSelectChange}
      >
        {sections}
      </InputSelect>
    </div>
  )
}
