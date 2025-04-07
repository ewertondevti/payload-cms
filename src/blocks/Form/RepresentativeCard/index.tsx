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
import { FC, useEffect, useState } from 'react'
import { RepresentativeDetails, RepresentativeDetailsModal } from '../RepresentativeDetailsModal'
import { useFormContext } from 'react-hook-form'

type RepresentativeCardProps = {
  name: string
  label: string
  defaultValue?: RepresentativeDetails
  disabled?: boolean
}

export const RepresentativeCard: FC<RepresentativeCardProps> = ({
  name,
  label,
  defaultValue,
  disabled,
}) => {
  const { setValue } = useFormContext()
  const { show } = useModalContext()
  const [representative, setRepresentative] = useState<RepresentativeDetails | undefined>(
    defaultValue,
  )

  const editRepresentative = () => {
    show(<RepresentativeDetailsModal prefilled={representative} onSubmit={setRepresentative} />, {
      closeButtonLabel: 'Fechar',
      darkMode: false,
    })
  }

  useEffect(() => {
    setValue(name, representative)
  }, [name, representative, setValue])

  return (
    <div className="w-fill">
      <div className="w-fill flex gap-32 rounded-t-16 bg-primary-100 p-24">
        <div className="p-2 flex size-64 flex-col items-center justify-center rounded-8 bg-white">
          <Icon dimensions="s" name="agora-line-user" />
        </div>
        <div className="flex grow flex-col gap-8">
          <h2 className="text-l-bold text-primary-900">{label}</h2>
          <h3 className="text-m-regular text-neutral-900">Dados do representante legal</h3>
        </div>
        <Button
          appearance="outline"
          disabled={disabled || representative !== undefined}
          hasIcon
          trailingIcon="agora-solid-plus-circle"
          trailingIconHover="agora-line-plus-circle"
          onClick={editRepresentative}
        >
          Adicionar
        </Button>
      </div>

      {!!representative && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Nº da cédula</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell headerLabel="Nome">{representative.name}</TableCell>
              <TableCell headerLabel="Nº da cédula">
                <div className="flex items-center justify-between">
                  <span>{representative.professionalId}</span>
                  {!disabled && (
                    <div className="flex">
                      <Button
                        appearance="link"
                        hasIcon
                        iconOnly
                        leadingIcon="agora-solid-edit"
                        leadingIconHover="agora-line-edit"
                        onClick={editRepresentative}
                      />
                      <Button
                        appearance="link"
                        variant="danger"
                        hasIcon
                        iconOnly
                        leadingIcon="agora-solid-trash"
                        leadingIconHover="agora-line-trash"
                        onClick={() => setRepresentative(undefined)}
                      />
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  )
}
