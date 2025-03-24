import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useModalContext,
} from '@ama-pt/agora-design-system'
import { FC, useState } from 'react'
import { RepresentativeDetails, RepresentativeDetailsModal } from '../RepresentativeDetailsModal'

type RepresentativeCardProps = {
  name: string
  label: string
}

export const RepresentativeCard: FC<RepresentativeCardProps> = ({ name, label }) => {
  const { show } = useModalContext()
  const [representatives, setRepresentatives] = useState<RepresentativeDetails[]>([])

  const removeRepresentative = (entryId: string) =>
    setRepresentatives((representatives) =>
      representatives.filter(({ entryId: currId }) => currId !== entryId),
    )

  const handleSubmitRepresentative = (representative: RepresentativeDetails) => {
    setRepresentatives((representatives) => {
      const arrayCopy = representatives.slice(0)
      const repIndex = representatives.findIndex(
        ({ entryId }) => entryId === representative.entryId,
      )
      if (repIndex > -1) arrayCopy[repIndex] = representative
      else arrayCopy.push(representative)
      return arrayCopy
    })
  }

  const editRepresentative = (representative?: RepresentativeDetails) => {
    console.log(representative)
    show(
      <RepresentativeDetailsModal
        prefilled={representative}
        onSubmit={handleSubmitRepresentative}
      />,
      { closeButtonLabel: 'Fechar', darkMode: false },
    )
  }

  return (
    <div className="w-fill">
      <div className="w-fill bg-primary-100 rounded-t-16 p-24 gap-32 flex">
        <div className="size-64 p-2 bg-white rounded-8 flex flex-col justify-center items-center">
          <Icon dimensions="s" name="agora-line-user" />
        </div>
        <div className="gap-8 flex flex-col grow">
          <h2 className="text-l-bold text-primary-900">{label}</h2>
          <h3 className="text-m-regular text-neutral-900">Dados do representante legal</h3>
        </div>
        <Button
          appearance="outline"
          hasIcon
          trailingIcon="agora-solid-plus-circle"
          trailingIconHover="agora-line-plus-circle"
          onClick={() => editRepresentative()}
        >
          Adicionar
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Nº da cédula</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {representatives.map((representative) => (
            <TableRow key={representative.entryId}>
              <TableCell headerLabel="Nome">{representative.name}</TableCell>
              <TableCell headerLabel="Nº da cédula">
                <div className="flex items-center justify-between">
                  <span>{representative.professionalId}</span>
                  <div className="flex">
                    <Button
                      appearance="link"
                      hasIcon
                      iconOnly
                      leadingIcon="agora-solid-edit"
                      leadingIconHover="agora-line-edit"
                      onClick={() => editRepresentative(representative)}
                    />
                    <Button
                      appearance="link"
                      variant="danger"
                      hasIcon
                      iconOnly
                      leadingIcon="agora-solid-trash"
                      leadingIconHover="agora-line-trash"
                      onClick={() => removeRepresentative(representative.entryId)}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
