export const dummyDetalhePedido = [
  {
    title: 'Primeiro progenitor',
    description: 'Informação detalhada sobre o primeiro progenitor',
  },
  {
    title: 'Segundo progenitor',
    description: 'Informação detalhada sobre o segundo progenitor',
  },
  {
    title: 'Identificação do bebé',
    description: 'Informação relacionada com o recém nascido',
  },
  {
    title: 'Dados estatísticos',
    description: 'Dados relacionados com a informação do nascimento',
  },
]

export const dummyDocuments = [
  {
    title: 'Declaração Hospitalar.pdf',
    documentPath: 'declaração_hospitalar.pdf',
  },
  {
    title: 'Fotografia.jpeg',
    documentPath: 'fotografia_986273.jpeg',
  },
]

export const dummyHeaders = ['Descritivo', 'Nº do pedido','Data','Estado','Ação']

export const dummyDataTable: Array<any> = [
  {
    'Descritivo': 'Registo de Nascimento',
    'Nº do pedido': '104 779 34',
    'Data': '30-01-2025 16:21',
    'Estado': 'Entregue',
    'Ação': 'Ver detalhes',
  },
  {
    'Descritivo': 'Cartão de cidadão',
    'Nº do pedido': '104 779 34',
    'Data': '20-01-2025 13:12',
    'Estado': 'Em andamento',
    'Ação': 'Ver detalhes',
  },
  {
    'Descritivo': 'Passaporte',
    'Nº do pedido': '104 779 34',
    'Data': '20-01-2025 13:12',
    'Estado': 'Concluído',
    'Ação': 'Ver detalhes',
  },
  {
    'Descritivo': 'Certidão de Casamento',
    'Nº do pedido': '104 779 34',
    'Data': '02-01-2021 11:15',
    'Estado': 'Concluído',
    'Ação': 'Ver detalhes',
  },
].sort(() => 0.5 - Math.random())
