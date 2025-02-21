'use client'

import { Option } from '@/models/form'
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

export type SelectWithAPIProps = InputSelectProps &
  UseFormReturn & { width: number; apidomain: string }

export const SelectWithApi: FC<SelectWithAPIProps> = ({
  setValue,
  apidomain,
  className,
  width,
  ...props
}) => {
  const [sections, setSections] = useState<ReactElement<DropdownSectionProps>[]>([])

  const generatedId = useId()

  useEffect(() => {
    if (!props.disabled) {
      fetch(apidomain, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          const newOptions: Option[] = data.map((d: any) => ({
            label: `${d.name.common}`,
            value: d.name.common,
          }))

          const newSections = [
            <DropdownSection key={`my-input-select-${generatedId}-${0}`} name="Countries">
              {newOptions.map(({ label, value }) => (
                <DropdownOption key={`my-input-select-${value}-${0}-0`} value={value}>
                  {label}
                </DropdownOption>
              ))}
            </DropdownSection>,
          ]

          setSections(newSections)
        })
    }
  }, [apidomain, props.disabled])

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

  const compProps: InputSelectProps = {
    ...props,
    onChange: onInputSelectChange,
  }

  return (
    <div className={containerClassName} style={{ width: `calc(${width}% - 16px)` }}>
      <style>
        {`
          .agora-dropdown.visible {
            max-height: ${(props.visibleCount ?? 4) * 62}px !important;
            overflow-y: auto !important;
          }

          .agora-input-select-label {
            margin-bottom: 8px !important;
          }
        `}
      </style>

      <InputSelect {...compProps}>{sections}</InputSelect>
    </div>
  )
}
