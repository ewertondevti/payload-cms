import { Button } from '@ama-pt/agora-design-system'
import React from 'react'

export const LoadDataCard = () => {
  return (
    <div className="w-full p-16 bg-primary-200 flex justify-between rounded-8">
      <div className="flex flex-col gap-8">
        <h2 className="text-l-bold text-primary-900">Cartão de cidadão</h2>
        <span className="text-neutral-900 text-m-regular">Lorem ipsum</span>
      </div>
      <Button
        hasIcon
        trailingIcon="agora-line-plus-circle"
        trailingIconHover="agora-solid-plus-circle"
      >
        Carregar dados
      </Button>
    </div>
  )
}
