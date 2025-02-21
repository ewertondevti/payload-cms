'use client'
import { Icon, LinkWrapper } from '@ama-pt/agora-design-system'
import React, { useEffect, useState } from 'react'
import { getNextActions } from '../../api/get'
import CustomTable from '@/components/Table'
import { CardGeneral } from '@/components/CardGeneral'
import { dummyHeaders, dummyNotification } from './dummy'
import './style.css'
const NotificationCenter = () => {
  const [actions, setActions] = useState([])

  const handleGetters = async () => {
    const actionsData = await getNextActions()
    setActions(actionsData)
  }

  useEffect(() => {
    handleGetters()
  }, [])

  return (
    <div className="container mx-auto my-32 notification" style={{ padding: 50 }}>
      <section
        className="flex space-between"
        style={{ justifyContent: 'space-between', marginBottom: 80 }}
      >
        <div className="title">
          <h1 style={{ marginBottom: 20 }}>Centro de notificações</h1>
          <p className="subtitle">
            Mantenha atualizado em tempo real e aceda a todas as suas notificações num só lugar
          </p>
        </div>

        {/* <div
          className="flex warning"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex',
            marginTop: -60,
          }}
        >
          <Icon
            name={'agora-line-settings'}
            className="fill-primary-500"
            aria-hidden
            style={{ marginTop: 95, marginRight: 10 }}
          />
          <LinkWrapper variant="primary">
            <a href={''}>{'Desistir do pedido'}</a>
          </LinkWrapper>
        </div> */}
      </section>

      <section style={{ marginBottom: 160 }}>
        <CustomTable args={dummyNotification} headers={dummyHeaders} />
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

export default NotificationCenter
