'use client'
import { FC, useEffect, useState } from 'react'
import { Select, SelectProps } from '../Select'

export type SelectWithAPIProps = Omit<SelectProps, 'options'> & {
  apidomain: string
}

export const SelectWithApi: FC<SelectWithAPIProps> = ({ apidomain, ...props }) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    if (!props.disabled) {
      fetch(apidomain, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setOptions(
            data.map((d: any) => ({
              label: `${d.name.common}`,
              value: d.name.common,
            })),
          )
        })
    }
  }, [apidomain, props.disabled])

  return <Select {...{ ...props, options }} />
}
