'use client'
import { CardEmphasize } from '@ama-pt/agora-design-system'
import React from 'react'
import { redirect } from 'next/navigation'
import './style.css'

const Authentication = () => {
  const handleRedirect = (path: any) => {
    redirect(path)
  }

  return (
    <div className="container auth" style={{ display: 'flow' }}>
      <div style={{ marginBottom: 100 }}>
        <h2>Autenticar como cidadão português ou europeu</h2>
      </div>

      <section
        className="grid xs:grid-cols-12 md:grid-cols-2 xl:grid-cols-3 cidadao-auth"
        style={{ marginBottom: 100, justifyContent: 'space-between' }}
      >
        <div style={{ maxWidth: 400, margin: 20, }}>
          <CardEmphasize
            icon={{ name: '/media/chave_movel.png'}}
            alignment="left"
            title="Cartão de Cidadão ou Chave Movel Digital"
            description="Esta opção permite-lhe fazer uso do seu cartão de cidadão ou da 
            chave móvel digital para realizar a autenticação no portal e poder aceder a informação e 
            utilizar serviços que exigem a verificação da sua identidade."
            mainButton={{
              hasIcon: true,
              trailingIcon: 'agora-line-arrow-right-circle',
              trailingIconHover: 'agora-line-arrow-right-circle',
              children: 'Autenticação',
              fullWidth: true,
              onClick: () => redirect('http://localhost:3000/api/auth/signin'),
            }}
          />
        </div>
        <div style={{ maxWidth: 400, margin: 20 }}>
          <CardEmphasize
            icon={{ name: '/media/europa.png' }}
            alignment="left"
            title="Autenticação Europeia"
            description="Esta opção permite-lhe fazer uso da sua autenticação europeia para realizar 
            a autenticação no portal e poder aceder a informação e utilizar serviços que exigem a verificação da sua identidade."
            mainButton={{
              hasIcon: true,
              trailingIcon: 'agora-line-arrow-right-circle',
              trailingIconHover: 'agora-line-arrow-right-circle',
              children: 'Autenticação',
              fullWidth: true,
            }}
          />
        </div>
      </section>
      <div style={{ marginBottom: 100 }}>
        <h2>Autenticar como profissional</h2>
      </div>
      <section
        className="grid xs:grid-cols-12 md:grid-cols-2 xl:grid-cols-3 gap-8"
        style={{ marginBottom: 160 }}
      >
        <div>
          <CardEmphasize
            icon={{ name: '/media/justica.png' }}
            alignment="left"
            title="Utilizar Ministério da Justiça"
            description="Esta opção permite-lhe fazer autenticação com a sua conta do Ministério da Justiça."
            mainButton={{
              hasIcon: true,
              trailingIcon: 'agora-line-arrow-right-circle',
              trailingIconHover: 'agora-line-arrow-right-circle',
              children: 'Autenticação',
              fullWidth: true,
              // onClick: () => redirect('http://localhost:3000/api/auth/signin'),
              onClick: () => redirect('http://localhost:3000/AreaReservada'),
            }}
          />
        </div>
        <div>
          <CardEmphasize
            icon={{ name: '/media/republica portuguesa.png' }}
            alignment="left"
            title="Utilizador Ministério dos Negócios Estrangeiros"
            description="Esta opção permite-lhe fazer autenticação com a sua conta do Ministério dos Negócios Estrangeiros."
            mainButton={{
              hasIcon: true,
              trailingIcon: 'agora-line-arrow-right-circle',
              trailingIconHover: 'agora-line-arrow-right-circle',
              children: 'Autenticação',
              fullWidth: true,
            }}
          />
        </div>
        <div>
          <CardEmphasize
            style={{
              minHeight: 500,
            }}
            icon={{ name: '/media/instituicao publica.png' }}
            alignment="left"
            title="Certificado digital de advogado, solicitador e notário"
            description="Escolha o perfil e clique no botão Certificado Digital para poder realizar serviços que exigem a verificação da sua qualidade profissional."
            mainButton={{
              hasIcon: true,
              trailingIcon: 'agora-line-arrow-right-circle',
              trailingIconHover: 'agora-line-arrow-right-circle',
              children: 'Autenticação',
              fullWidth: true,
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Authentication
