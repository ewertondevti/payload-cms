import React, { FC } from 'react'
import { Button, useModalContext } from '@ama-pt/agora-design-system'
import { Nif } from '../Nif'
import { FormProvider, useForm } from 'react-hook-form'
import { ContactData } from '../ContactData'
import { TextBox } from '../TextBox'
import dayjs from 'dayjs'

export type RepresentativeDetails = {
  professionalId: string
  name: string
  nif: string
  address: string
  postalCode: string
  locality: string
  email: string
  phoneNumber: string
}

type RepresentativeDetailsModalProps = {
  prefilled?: RepresentativeDetails
  onSubmit?: (data: RepresentativeDetails) => void
}

export const RepresentativeDetailsModal: FC<RepresentativeDetailsModalProps> = ({
  prefilled,
  onSubmit,
}) => {
  const form = useForm()
  const { errors } = form.formState
  const { register } = form
  const { hide } = useModalContext()
  const handleSubmit = () => {
    form.handleSubmit((data: RepresentativeDetails) => {
      onSubmit && onSubmit(data)
      hide()
    })()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormProvider {...form}>
        <div className="flex w-full flex-col gap-64 px-96">
          <div className="flex w-full flex-col gap-8">
            <h1 className="text-2xl-bold text-primary-900">
              Dados de identificação do representante
            </h1>
            <p className="text-m-regular text-primary-900">
              Preencha os dados relativos ao pedido que pretende efetuar
            </p>
          </div>
          <h2 className="text-l-bold text-primary-900">Dados de Identificação</h2>
          <div className="flex w-full flex-wrap gap-32">
            <TextBox
              label="Nome completo"
              defaultValue={prefilled?.name}
              width={100}
              name="name"
              maxLength={230}
              required
            />
            <TextBox
              name="professionalId"
              label="Nº de cédula profissional"
              width={50}
              defaultValue={prefilled?.professionalId}
              minLength={6}
              maxLength={6}
              pattern={/^[a-zA-Z0-9]*$/g}
              required
            />
            <Nif
              {...form}
              label="Número de identificação fiscal (NIF)"
              name="nif"
              errors={errors}
              width={50}
            />
            <TextBox
              name="address"
              label="Domicílio profissional"
              placeholder="Indique o seu domicílio profissional"
              defaultValue={prefilled?.address}
              width={100}
              maxLength={100}
              required
            />
            <TextBox
              name="postalCode"
              label="Código Postal"
              placeholder="0000-000"
              defaultValue={prefilled?.postalCode}
              width={50}
              pattern={/^[0-9]{4}-[0-9]{3}$/}
              required
            />
            <TextBox
              name="locality"
              label="Localidade"
              placeholder="Indique a localidade"
              defaultValue={prefilled?.locality}
              width={50}
              maxLength={40}
              required
            />
          </div>
          <ContactData name="contactData" {...{ register, errors }} defaults={prefilled} />
          <div className="h-fill flex w-full justify-between">
            <Button appearance="outline">Sair do pedido</Button>
            <Button onClick={handleSubmit}>Adicionar (serviço)</Button>
          </div>
        </div>
      </FormProvider>
    </form>
  )
}
