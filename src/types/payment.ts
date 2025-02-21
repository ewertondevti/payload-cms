type Mensagem = {
  codigo: number
  descricao: string
  idMensagemExterna: string
}

type Dados = {
  entidadeNumero: string
  referencia: string
  montante: string
  transaccaoId: string
  dataExpiracao: Date
}

type DadosCC = {
  montante: string
  transaccaoId: string
  redirectUrl: string
  sessionToken: string
}

export interface PaymentResponse {
  mensagem: Mensagem
  dadosPesquisa: Dados | DadosCC
}

type Cabecalho = {
  nome_do_servico: string
  id_utilizador: string
  comunicacao: {
    idMensagemExterna: string
  }
}

type Argumentos = {
  pagamentoId: string
  pagamentoDesc: string
  montante: string
}

export interface PaymentRequest {
  cabecalho: Cabecalho
  argumentos: Argumentos
}

type ArgumentosStatus = {
  transacaoIds: {
    transacaoId: string[]
  }
}

export interface PaymentStatusRequest {
  cabecalho: Cabecalho
  argumentos: ArgumentosStatus
}

type dadosPesquisa = {
  transacao: {
    transacaoId: string
    idEstado: string
    data: string
    pagamentoId: string
  }
}

export interface PaymentStatusResponse {
  mensagem: Mensagem
  dadosPesquisa: dadosPesquisa
}
