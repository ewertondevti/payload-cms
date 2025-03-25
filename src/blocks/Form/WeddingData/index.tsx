import { useFormContext } from 'react-hook-form'
import { Select } from '../Select'
import { joinName } from '@/utilities/joinName'
import { FC, useEffect, useState } from 'react'
import { TextBox } from '../TextBox'
import { PortugueseAddress } from '../Address/PortugueseAddress'
import { DatePicker, relativeDate } from '../DatePicker'
import { TimePicker } from '../TimePicker'

type WeddingDataProps = {
  name: string
  partnerDataRef: {
    first: string
    second: string
  }
}

export const WeddingData: FC<WeddingDataProps> = ({ name, partnerDataRef }) => {
  const { watch } = useFormContext()
  const [weddingType, setWeddingType] = useState<string>()
  const [locationType, setLocationType] = useState<string>()
  const districts = []
  const conservatories = []
  const ages: number[] = watch([
    joinName(partnerDataRef.first, 'age'),
    joinName(partnerDataRef.second, 'age'),
  ])
  const sexes: number[] = watch([
    joinName(partnerDataRef.first, 'sex'),
    joinName(partnerDataRef.second, 'sex'),
  ])

  useEffect(() => {
    setLocationType(undefined)
  }, [weddingType])

  return (
    <div className="flex w-[800px] flex-col gap-64">
      <h2 className="text-l-bold text-primary-900">Modalidade</h2>
      <div className="flex flex-wrap gap-32">
        <Select
          name={joinName(name, 'regime')}
          label="Regime de bens"
          width={50}
          options={[
            { label: 'Comunhão de adquiridos', value: 'communion' },
            { label: 'Imperativo da separação de bens', value: 'separate' },
          ]}
          defaultValue={ages[0] > 60 || ages[1] > 60 ? 'separate' : 'communion'}
          disabled
          required
        />
        <Select
          name={joinName(name, 'type')}
          label="Tipo de casamento"
          width={50}
          options={[
            { label: 'Civil', value: 'civil' },
            ...(sexes[0] === sexes[1] ? [] : [{ label: 'Católico', value: 'catholic' }]),
            { label: 'Civil sob a forma religiosa', value: 'religious' },
          ]}
          onChange={setWeddingType}
          placeholder="Selecione o tipo de casamento"
          required
        />
        {weddingType === 'religious' && (
          <TextBox
            name={joinName(name, 'religion')}
            label={'Culto/comunidade religiosa'}
            width={50}
            maxLength={100}
            required
          />
        )}
      </div>
      <h2 className="text-l-bold text-primary-900">Local e data do casamento</h2>
      <div className="flex w-full flex-wrap gap-32">
        {weddingType == 'civil' && (
          <div className="w-full">
            <Select
              name={joinName(name, 'locationtype')}
              label="Local do casamento"
              options={[
                { label: 'Na Conservatória', value: 'conservatory' },
                { label: 'Fora da conservatória', value: 'nonConservatory' },
              ]}
              placeholder="Selecione o local do casamento"
              required
              onChange={setLocationType}
              width={50}
            />
          </div>
        )}
        {weddingType === 'civil' && locationType === 'conservatory' && (
          <>
            <Select
              name={joinName(name, 'conservatory', 'district')}
              label="Distrito da conservatória"
              options={districts}
              placeholder="Selecione o distrito da conservatória"
              required
              width={50}
            />
            <Select
              name={joinName(name, 'conservatory')}
              label="Conservatória"
              options={conservatories}
              placeholder="Selecione a conservatória"
              required
              width={50}
            />
          </>
        )}
        {!!weddingType && (weddingType !== 'civil' || locationType === 'nonConservatory') && (
          <PortugueseAddress name={joinName(name, 'address')} />
        )}
        {weddingType === 'religious' && (
          <TextBox
            width={100}
            name={joinName(name, 'minister')}
            label="Nome do ministro de culto"
            placeholder="Indique o nome do ministro de culto"
            required
            maxLength={100}
          />
        )}
        <DatePicker
          width={50}
          name={joinName(name, 'date')}
          label="Data da cerimónia"
          relativeMinDate={relativeDate(8, 'days', 'before')}
          required
        />
        {weddingType === 'civil' && (
          <TimePicker name={joinName(name, 'time')} width={50} label="Hora da cerimónia" required />
        )}
      </div>
    </div>
  )
}
