'use client'
import { Button, Icon, LinkWrapper, StatusCard } from '@ama-pt/agora-design-system'
import { getNextActions } from '../../api/get'
import React, { useEffect, useState } from 'react'
import { CardGeneral } from '@/components/CardGeneral'
import './style.css'
const DetalheNotificacao = () => {
  const [actions, setActions] = useState([])

  const handleGetters = async () => {
    const actionsData = await getNextActions()
    setActions(actionsData)
  }

  useEffect(() => {
    handleGetters()
  }, [])

  return (
    <div className="container mx-auto my-32 notifications" style={{ padding: 50 }}>
      <section className="flex space-between" style={{ justifyContent: 'space-between' }}>
        <div className="title">
          <h1 style={{ marginBottom: 20 }}>Suprimento de deficiências</h1>
          <p className="subtitle">Confira abaixo a notificação relativa ao tema identificado</p>
        </div>
      </section>

      <section style={{ marginBottom: 60 }}>
        <p>
          Notifica-se V. Exa. para, no prazo de 5 dias, efetuar o suprimento de deficiências do
          processo de registo de nascimento acima referido, procedendo ao envio da certidão de
          nascimento original emitida pela instituição hospitalar ou entidade competente onde
          ocorreu o nascimento, bem como quaisquer documentos adicionais que comprovem a identidade
          e filiação da criança.
          <br></br>
          <br></br>
          Conservatória do Cidadão de Lisboa, em 18/10/2024. O/A
          <br></br>
          <br></br>
          Conservador(a) de Registos
          <br></br>
          Maria Ferreira
        </p>
      </section>

      <section style={{ marginBottom: 160 }}>
        <div>
          <StatusCard
            description={'Deve regularizar a situação acima no prazo de 5 dias úteis'}
            type={'danger'}
          />
        </div>
        <div className="flex flex-row-reverse" style={{ marginTop: 60 }}>
          <Button
            children="Regularizar pedido"
            hasIcon={true}
            leadingIcon="agora-line-arrow-right-circle"
            leadingIconHover="agora-solid-arrow-right-circle"
          />
          <LinkWrapper variant="danger" style={{ marginRight: 40 }}>
            <a href={''}>{'Desistir do pedido'}</a>
          </LinkWrapper>
        </div>
      </section>

      <section className="actions" style={{ marginBottom: 100 }}>
        <div className="flex space-between" style={{ justifyContent: 'space-between' }}>
          <div className="title">
            <h3>Proximas ações</h3>
            <p className="subtitle">Estas ações precisam da sua atenção</p>
          </div>

          <div
            className="flex primary"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              display: 'flex',
              marginTop: -60,
            }}
          >
            <LinkWrapper>
              <a href={''}>{'Ver todos'}</a>
            </LinkWrapper>
            <Icon
              name={'agora-line-arrow-right-circle'}
              aria-hidden
              style={{ marginTop: 85, marginLeft: 10 }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-4">
          {actions?.map((action, index) => <CardGeneral props={action} key={index} />)}
        </div>
      </section>
    </div>
  )
}

export default DetalheNotificacao
