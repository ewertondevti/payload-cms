'use client'
import React, { useEffect, useState } from 'react'

import { Avatar, Button, Icon, LinkWrapper, Pill } from '@ama-pt/agora-design-system'

import './style.css'
import { CardGeneral } from '@/components/CardGeneral'
import { CardBasic } from '@/components/BasicCard/Component'
import { getNextActions, getTimeLineData, getLifeCycleInfo, getFavorites } from '../../api/get'
import { redirect } from 'next/navigation'

const AreaReservada = () => {
  const [actions, setActions] = useState([])
  const [timeline, setTimeline] = useState([])
  const [lifeCycle, setLifeCycle] = useState([])
  const [favorites, setFavorites] = useState([])

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
      <section style={{ marginBottom: 130 }}>
        <div
          className="grid xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-2"
          style={{ justifyContent: 'space-between' }}
        >
          <div className="flex" style={{ justifyContent: 'space-between' }}>
            <Avatar
              avatarType="initials"
              srcPath="JS"
              style={{ width: 140, height: 140, background: '#e3f4ff',}}
            />
            <div>
              <h1>João Manuel da Silva</h1>
              <div className="my-4">
                <Pill
                  children={
                    <div className="flex">
                      <Icon
                        className="icon-color-1"
                        name={'agora-line-smartphone'}
                        aria-hidden
                        style={{ marginRight: 5 }}
                      />{' '}
                      945984292
                    </div>
                  }
                  variant="secondary-light"
                />
                <Pill
                  children={
                    <div className="flex">
                      <Icon
                        className="icon-color-1"
                        name={'agora-line-at-sign'}
                        aria-hidden
                        style={{ marginRight: 5 }}
                      />{' '}
                      joao_ms@mail.com
                    </div>
                  }
                  variant="secondary-light"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse h-1/2">
            <Button
              children="Criar novo Pedido"
              hasIcon={true}
              leadingIcon="agora-line-arrow-right-circle"
              leadingIconHover="agora-solid-arrow-right-circle"
              onClick={() => {redirect("/serviceArea/1")} }
            />
          </div>
        </div>
      </section>

      <section className="actions" style={{ marginBottom: 150 }}>
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

        <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-8">
          {actions?.map((action, index) => <CardGeneral props={action} key={index} />)}
        </div>
      </section>

      <section className="block container mt-6 life-cycle" style={{ marginBottom: 150 }}>
        <div style={{ marginBottom: 60 }}>
          <h3>Ciclo de vida</h3>
          <p className="subtitle">
            Conheça os ciclos de vida que pode gerir através do Portal dos serviços da justiça
          </p>
        </div>
        <div className="grid xs:grid-cols-6 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {lifeCycle?.map((cycle, index) => <CardBasic props={cycle} key={index} />)}
        </div>
      </section>

      <section className="block mx-auto container">
        <div style={{ marginBottom: 30 }}>
          <h3>Favoritos</h3>
          <p className="subtitle">Os seus serviços favoritos num só lugar</p>
        </div>
        <div className="grid  xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {favorites?.map((fav: any, index) => (
            <div className="flex row" key={index} style={{ alignItems: 'center' }}>
              <Icon name={'agora-line-star'} aria-hidden style={{ marginRight: 20 }} />
              <LinkWrapper>
                <a href={fav.link}>{fav.description}</a>
              </LinkWrapper>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AreaReservada
