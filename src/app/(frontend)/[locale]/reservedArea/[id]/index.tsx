'use client'
import React, { useEffect, useState } from 'react'
import { getNextActions, getTimeLineData, getLifeCycleInfo, getFavorites } from '../../../api/get'
import { Avatar, Button, Icon, LinkWrapper, Pill } from '@ama-pt/agora-design-system'

import './style.css'

/* import { Timeline } from "../../Components/TimeLine/Component"; */
import { CardGeneral } from '@/components/CardGeneral'
import { CardBasic } from '@/components/BasicCard'

const AreaReservada = () => {
  const [actions, setActions] = useState([])
  const [timeline, setTimeline] = useState([])
  const [lifeCycle, setLifeCycle] = useState([])
  const [favorites, setFavorites]: any = useState([])

  const handleGetters = async () => {
    const actionsData = await getNextActions()
    setActions(actionsData)
    const timelineData = await getTimeLineData()
    setTimeline(timelineData)
    const lifeCycleData = await getLifeCycleInfo()
    setLifeCycle(lifeCycleData)
    const favoritesData = await getFavorites()
    setFavorites(favoritesData)
  }

  useEffect(() => {
    handleGetters()
  }, [])

  return (
    <div className="container mx-auto my-32 reserved-area user-area">
      <section style={{ marginBottom: 200 }}>
        <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginRight: 100 }}>
              <Avatar avatarType="initials" srcPath={'JS'} style={{ width: 200, height: 200 }} />
            </div>
            <div className='avatar-name'>
              <h2>João Manuel da Silva</h2>
              <div className="flex" style={{marginTop: 30}}>
                <span className="flex custom-pill">
                  <Icon name={'agora-line-smartphone'} aria-hidden dimensions="m" />
                  <p>
                    910 102 029
                  </p>
                </span>
                <span className="flex custom-pill">
                  <Icon name={'agora-line-at-sign'} aria-hidden dimensions="m" />
                  <p>
                  joao_ms@mail.com
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div>
            <Button
              children="Criar novo pedido"
              hasIcon={true}
              leadingIcon="agora-line-arrow-right-circle"
              leadingIconHover="agora-solid-arrow-right-circle"
            />
          </div>
        </div>
      </section>
      <section style={{ marginBottom: 250 }}>
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

        <div className="grid gap-32 row actions" style={{ display: 'flex' }}>
          {actions?.map((action, index) => <CardGeneral props={action} key={index} />)}
        </div>
      </section>

      {/*  <div className="block container" style={{ marginBottom: 150 }}>
        <div style={{ marginBottom: 60 }}>
          <h3>A minha linha do tempo</h3>
          <p className="subtitle">
            Consulte aqui todas as suas interações com o Insituto de Rgisto e
            Notariado
          </p>
        </div>
        <div>
           <Timeline props={timeline}/>
        </div>
      </div> */}

      <div className="block container" style={{ marginBottom: 150 }}>
        <div style={{ marginBottom: 60 }}>
          <h3>Ciclo de vida</h3>
          <p className="subtitle">
            Conheça os ciclos de vida que pode gerir através do Portal dos serviços da justiça
          </p>
        </div>
        <div className="flex" style={{ marginLeft: -22 }}>
          {lifeCycle?.map((cycle, index) => <CardBasic props={cycle} key={index} />)}
        </div>
      </div>

      <div className="block mx-auto container">
        <div style={{ marginBottom: 60 }}>
          <h3>Favoritos</h3>
          <p className="subtitle">Os seus serviços favortiso num só lugar</p>
        </div>
        <div className="grid-container">
          {favorites?.map((fav, index) => (
            <div className="flex" key={index}>
              <Icon
                name={'agora-line-star'}
                aria-hidden
                style={{ marginTop: 30, marginRight: 20 }}
              />
              <LinkWrapper>
                <a href={fav.link}>{fav.description}</a>
              </LinkWrapper>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AreaReservada
