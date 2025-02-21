import { jsPDF } from 'jspdf'
import { Icon } from '@ama-pt/agora-design-system'
import autoTable, { RowInput } from 'jspdf-autotable'

interface DownloadRequestProps {
  identifcationData: any
  paymentData: any
  services: any
  requestNumber: string
  urgencyFee: string | undefined
}

const DownloadRequest = ({
  identifcationData,
  paymentData,
  services,
  requestNumber,
  urgencyFee,
}: DownloadRequestProps) => {
  const addressText = identifcationData?.cvtEstrangeira
    ? identifcationData.cvtEstrangeira
    : `${identifcationData?.cvtMorada || ''}\n\n${identifcationData?.cvtCodPostal || ''} ${identifcationData?.cvtLocalidade || ''}`.trim()

  const generatePDF = () => {
    const doc = new jsPDF()

    const imgUrl = '/pdfLogo.png'
    const img = new Image()
    img.src = imgUrl

    img.onload = () => {
      const imgWidth = 60
      const imgHeight = 18
      doc.addImage(img, 'PNG', 20, 20, imgWidth, imgHeight)

      doc.setFont('times', 'bold')
      doc.setFontSize(14)
      doc.text('Comprovativo do Pedido', 20, imgHeight + 35)

      doc.setFont('times', 'normal')
      doc.setFontSize(12)
      doc.text('INSTITUTO DOS REGISTOS E DO NOTARIADO, I.P', 20, imgHeight + 50, { maxWidth: 170 })

      const pageWidth = doc.internal.pageSize.width
      const columnWidth = pageWidth / 2 - 10
      const spacing = 5
      doc.setFontSize(11)

      doc.text('Avenida D.João II, 1.8.01D, edifício H Campus da Justiça', 20, imgHeight + 60, {
        maxWidth: columnWidth,
      })
      doc.text('1803-001 Lisboa', 20, imgHeight + 70, { maxWidth: columnWidth })
      doc.setFont('times', 'bold')
      doc.text('NIPC:', 20, imgHeight + 80)
      doc.setFont('times', 'normal')
      doc.text(' 508184258', 32, imgHeight + 80)
      doc.setFont('times', 'bold')
      doc.text('E-Mail:', 20, imgHeight + 90)
      doc.setFont('times', 'normal')
      doc.text(' irn@irn.mj.pt', 35, imgHeight + 90)

      doc.setFont('times', 'bold')
      doc.text('Exmo. (a) Sr. (a):', columnWidth + spacing + 20, imgHeight + 60, {
        maxWidth: columnWidth,
      })
      doc.setFont('times', 'normal')
      doc.text(identifcationData?.cvtNome || '', columnWidth + spacing + 20, imgHeight + 70, {
        maxWidth: columnWidth,
      })

      doc.text(addressText, columnWidth + spacing + 20, imgHeight + 80, {
        maxWidth: columnWidth,
      })

      /*doc.text(identifcationData?.cvtMorada || '', columnWidth + spacing + 20, imgHeight + 80, {
        maxWidth: columnWidth,
      })
      doc.text(
        (identifcationData?.cvtCodPostal || '') + ' ' + (identifcationData?.cvtLocalidade || ''),
        columnWidth + spacing + 20,
        imgHeight + 90,
        {
          maxWidth: columnWidth,
        },
      )*/
      doc.setFont('times', 'bold')
      doc.text('NIF/NIPC:', columnWidth + spacing + 20, imgHeight + 100, {
        maxWidth: columnWidth,
      })
      doc.setFont('times', 'normal')
      doc.text(identifcationData?.cvtNIF || '', columnWidth + spacing + 40, imgHeight + 100, {
        maxWidth: columnWidth,
      })

      doc.setFont('times', 'bold')
      doc.text('Serviço(s) solicitado(s)', 20, imgHeight + 110)

      const head: RowInput[] = [
        [
          {
            content: 'Entidade: N/A',
            colSpan: 2,
            styles: {
              fillColor: [224, 224, 224] as [number, number, number],
              textColor: [0, 0, 0],
            },
          },
          {
            content: 'NIF/NIPC: 508184258',
            colSpan: 1,
            styles: {
              fillColor: [224, 224, 224] as [number, number, number],
              textColor: [0, 0, 0],
            },
          },
        ],

        [
          {
            content: 'Pedido',
            styles: {
              fillColor: [224, 224, 224] as [number, number, number],
              halign: 'center',
              textColor: [0, 0, 0],
            },
          },
          {
            content: 'Identificação',
            styles: {
              fillColor: [224, 224, 224] as [number, number, number],
              halign: 'center',
              textColor: [0, 0, 0],
            },
          },
          {
            content: 'Valor',
            styles: {
              fillColor: [224, 224, 224] as [number, number, number],
              halign: 'center',
              textColor: [0, 0, 0],
            },
          },
        ],
      ]

      const body: RowInput[] = [
        [
          { content: requestNumber, styles: { halign: 'center', textColor: [0, 0, 0] } },
          { content: services[0]?.description, styles: { halign: 'center', textColor: [0, 0, 0] } },
          {
            content: (services[0]?.value || 0) + ' €',
            styles: { halign: 'center', textColor: [0, 0, 0] },
          },
        ],
      ]

      if (urgencyFee) {
        body.push([
          { content: requestNumber, styles: { halign: 'center', textColor: [0, 0, 0] } },
          { content: 'Taxa de Urgência', styles: { halign: 'center', textColor: [0, 0, 0] } },
          {
            content: urgencyFee + ' €',
            styles: { halign: 'center', textColor: [0, 0, 0] },
          },
        ])
      }

      const sum = urgencyFee
        ? (Number(urgencyFee) || 0) + (Number(services[0]?.value) || 0)
        : Number(services[0]?.value) || 0

      const foot: RowInput[] = [
        [
          { content: '', colSpan: 2, styles: { halign: 'right' } },
          { content: 'Total: ' + (sum || 0) + ' €', styles: { halign: 'right' } },
        ],
      ]

      autoTable(doc, {
        startY: imgHeight + 120,
        head,
        body,
        foot,
        theme: 'grid',
        styles: {
          font: 'times',
          fontSize: 10,
          cellPadding: 4,
        },
        headStyles: {
          fontStyle: 'bold',
        },
        footStyles: {
          fillColor: [224, 224, 224] as [number, number, number],
          textColor: [0, 0, 0],
        },
      })

      doc.text('Dados de Pagamento', 20, urgencyFee ? imgHeight + 190 : imgHeight + 180)

      doc.addImage(
        '/multibanco.png',
        'PNG',
        20,
        urgencyFee ? imgHeight + 200 : imgHeight + 190,
        25,
        25,
      )

      autoTable(doc, {
        startY: urgencyFee ? imgHeight + 200 : imgHeight + 190,
        margin: { left: 80 },
        body: [
          ['Entidade', paymentData?.entity],
          ['Referência', paymentData?.reference],
          ['Valor', sum + '€'],
          ['Data limite', paymentData?.expirationDate],
        ],
        theme: 'striped',
        styles: {
          fontSize: 10,
          cellPadding: 4,
          textColor: [0, 0, 0],
        },
      })

      doc.addPage()
      doc.setFont('times', 'normal')
      doc.text('O talão emitido pela caixa automática faz prova de pagamento. Conserve-o.', 20, 20)
      doc.text(
        'O pedido só dará entrada depois de verificado o pagamento. A falta de pagamento dentro do prazo indicado ',
        20,
        30,
      )
      doc.text('implica o cancelamento imediato do pedido.', 20, 35)
      doc.text(
        'Após o pagamento será enviado por email o documento de cobrança, que serve de comprovativo, podendo ',
        20,
        45,
      )
      doc.text('também ser consultado na área reservada.', 20, 50)

      doc.setFont('times', 'normal')
      doc.setFontSize(8)
      doc.text('Contactos Helpdesk', 20, 60)
      doc.text('Linha Registos: 211 950 500 (de 2ª a 6ª entre as 9:00h e as 17:00h)', 20, 65)
      doc.text('Correio eletrónico: registosonline@irn.mj.pt', 20, 70)

      doc.save('Comprovativo_Pedido.pdf')
    }

    img.onerror = () => {
      alert('Falha ao carregar a imagem. Tente novamente.')
    }
  }

  return (
    <div className="flex gap-8 bg-[#E5F6FF] w-full p-4">
      <div className="flex flex-row gap-2">
        <Icon name="agora-solid-file" />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[16px] leading-[28px]">Comprovativo do Pedido</p>
          <span className="text-[16px] leading-[28px]">
            A informação do pedido foi enviada para o seu email. Também a pode visualizar, clicando
            em:
          </span>
          <a
            onClick={generatePDF}
            className="flex gap-2 text-[#034ad8] cursor-pointer"
            style={{ textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            <span>Descarregar</span>
            <Icon name="agora-line-download" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default DownloadRequest
