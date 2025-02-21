import { TableGeneral } from '@/components/TableGeneral'

interface RequestSummaryProps {
  urgencyFee: string | undefined
  services: any
  requestNumber: string
}

const RequestSummary = ({ urgencyFee, services, requestNumber }: RequestSummaryProps) => {
  const sum =
    services.map((service) => Number(service.value)).reduce((acc, value) => acc + value, 0) +
    (urgencyFee ? Number(urgencyFee) : 0)

  const requestToShow = services.map((service) => {
    return {
      ...service,
      value: service.value + ' €',
      description: (
        <div className="flex flex-col">
          <span className="font-bold text-[16px] leading-[28px] text-[#2B363C]">
            {service.description}
          </span>
          <span className="text-[16px] leading-[28px] text-[#2B363C]">
            Número do pedido: {requestNumber}
          </span>
        </div>
      ),
    }
  })

  if (urgencyFee) {
    requestToShow.push({
      description: (
        <span className="font-bold text-[16px] leading-[28px] text-[#2B363C]">
          Taxa de urgência
        </span>
      ),
      value: urgencyFee + ' €',
    })
  }

  return (
    <>
      <h2 className="font-semibold text-[24px] leading-[36px] text-[#021C51]">Resumo do Pedido</h2>
      <TableGeneral
        columns={[
          { label: 'Descrição', field: 'description', type: 'jsx' },
          { label: 'Valores', field: 'value', type: 'numeric' },
        ]}
        rows={requestToShow}
        footer={[
          { headerLabel: 'Descrição', value: 'Total dos Serviços' },
          { headerLabel: 'Valores', value: sum + ' €' },
        ]}
        enablePagination={false}
      />
    </>
  )
}

export default RequestSummary
