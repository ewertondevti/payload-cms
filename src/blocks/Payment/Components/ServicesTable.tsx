import { TableGeneral } from '@/components/TableGeneral'

interface ServicesTableProps {
  urgencyFee: string | undefined
  services: any
}

const ServicesTable = ({ urgencyFee, services }: ServicesTableProps) => {
  const sum =
    services?.map((service) => Number(service.value)).reduce((acc, value) => acc + value, 0) +
    (urgencyFee ? Number(urgencyFee) : 0)

  const servicesToShow = services?.map((service) => {
    return {
      ...service,
      value: service.value + ' €',
    }
  })

  if (urgencyFee) {
    servicesToShow.push({ description: 'Taxa de urgência', value: urgencyFee + ' €' })
  }

  return (
    <div className="flex flex-col gap-16">
      <h2 className="font-semibold text-[20px] leading-[32px] text-[#021C51]">
        Serviços solicitados
      </h2>
      <TableGeneral
        columns={[
          { label: 'Descrição', field: 'description', type: 'string' },
          { label: 'Valores', field: 'value', type: 'numeric' },
        ]}
        rows={servicesToShow}
        footer={[
          { headerLabel: 'Descrição', value: 'Total dos Serviços' },
          { headerLabel: 'Valores', value: sum + ' €' },
        ]}
        enablePagination={false}
      />
    </div>
  )
}

export default ServicesTable
