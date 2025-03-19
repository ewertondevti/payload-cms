import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Select } from '../../Select'
import { joinName } from '@/utilities/joinName'
import { FlexRadioButtonGroup } from '../../Cidadao/FlexRadioButtonGroup'
import { useEffect, useState } from 'react'
import { CustomNumber } from '../../CustomNumber'
import { Checkbox } from '../../Checkbox'

export interface CitizenshipCardRequestProps {
  name: string
  apiUrl: string
  parentDataRef: { first: string; second: string }
}

const options = {
  address: [
    { label: 'Morada do 1º progenitor', value: 'first' },
    { label: 'Morada do 2º progenitor', value: 'second' },
  ],
  homeDelivery: [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ],

  typeOfLocation: [{ label: 'Balcão de atendimento', value: 'booth' }],
  typeOfLocationForeign: [{ label: 'Consulado', value: 'consulate' }],
}

const useRequest = (url: string) => {
  // TODO: Complete this
  return []
}

export const CitizenshipCardRequest = ({
  name,
  apiUrl,
  parentDataRef,
  register,
  errors,
  watch,
  ...rest
}: CitizenshipCardRequestProps & {
  errors: FieldErrors<FieldValues>
} & UseFormReturn) => {
  const [requestCitizenshipCard, setRequestCitizenshipCard] = useState<boolean>()
  const [address, setAddress] = useState<string>()
  const [portugueseAddress, setPortugueseAddress] = useState<boolean>()
  const [homeDelivery, setHomeDelivery] = useState<boolean>()
  const [typeOfLocation, setTypeOfLocation] = useState<string>()
  const [first, second]: string[] = watch([
    joinName(parentDataRef.first, 'address', 'cvcResidencia'),
    joinName(parentDataRef.second, 'address', 'cvcResidencia'),
  ])
  const nationalities: string[] = watch([
    joinName(parentDataRef.first, 'nationality', 'country'),
    joinName(parentDataRef.second, 'nationality', 'country'),
  ])
  const locationOptions = useRequest(apiUrl)

  useEffect(() => {
    address && setPortugueseAddress({ first, second }[address] === 'PT')
  }, [address, first, second])

  return nationalities.includes('Portugal') ? (
    <div className="flex gap-64 flex-col">
      <h2 className="text-l-bold text-primary-900">Cartão de Cidadão</h2>

      <FlexRadioButtonGroup
        name={joinName(name, 'requestCitizenshipCard')}
        label="Pedir cartão de cidadão"
        alignment="horizontal"
        options={[
          { label: 'Sim', value: 'true' },
          { label: 'Não', value: 'false' },
        ]}
        {...{ watch, register, ...rest }}
        onChange={(value) => setRequestCitizenshipCard(JSON.parse(value))}
      />
      {requestCitizenshipCard && (
        <div className="flex flex-wrap gap-32">
          <Select
            name={joinName(name, 'address')}
            width={50}
            options={options.address}
            onChange={setAddress}
            label="Morada do registo"
          />
          {portugueseAddress && (
            <Select
              name={joinName(name, 'homeDelivery')}
              width={50}
              options={options.homeDelivery}
              label="Entrega na residência?"
              onChange={(value) => setHomeDelivery(JSON.parse(value))}
            />
          )}
          <Select
            name={joinName(name, 'typeOfLocation')}
            width={50}
            options={[
              ...options.typeOfLocation,
              ...(!portugueseAddress ? options.typeOfLocationForeign : []),
            ]}
            label={`Tipo de local de ${homeDelivery ? 'devolução' : 'entrega'}`}
            onChange={setTypeOfLocation}
          />
          <Select
            name={joinName(name, 'location')}
            width={50}
            options={locationOptions}
            label={typeOfLocation == 'consulate' ? 'Consulado' : 'Balcão'}
          />
          <CustomNumber
            name={joinName(name, 'height')}
            label="Altura (em cm)"
            width={50}
            {...{ errors, register }}
            max={100}
            min={15}
          />
          <Checkbox
            name={joinName(name, 'puk')}
            label="Esta autorização permite guardar os códigos na aplicação do cartão, e efetuar a sua recuperação, em caso de extravio da carta PIN."
            {...{ errors, register }}
            width={100}
          />
        </div>
      )}
    </div>
  ) : null
}
