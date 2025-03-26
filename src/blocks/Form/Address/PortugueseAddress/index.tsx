import { joinName } from '@/utilities/joinName'
import { TextBox } from '../../TextBox'
import { FC } from 'react'
import { Select } from '../../Select'

type PortugueseAddressProps = {
  name: string
}

export const PortugueseAddress: FC<PortugueseAddressProps> = ({ name }) => {
  const districts = []
  const counties = []
  const parishes = []
  return (
    <div className="flex w-full flex-wrap gap-32">
      <TextBox
        name={joinName(name, 'address')}
        label="Morada"
        width={100}
        placeholder="Indique a morada"
        required
        maxLength={230}
      />
      <Select
        name={joinName(name, 'district')}
        label="Distrito"
        options={districts}
        placeholder="Selecione o distrito"
        required
        width={50}
      />
      <Select
        name={joinName(name, 'county')}
        label="Concelho"
        options={counties}
        placeholder="Selecione o concelho"
        required
        width={50}
      />
      <Select
        name={joinName(name, 'parish')}
        label="Freguesia"
        options={parishes}
        placeholder="Selecione a freguesia"
        required
        width={50}
      />
    </div>
  )
}
