import { Icon, LinkWrapper } from '@ama-pt/agora-design-system'
import React, { useEffect, useState } from 'react'
import './style.css'
const SideBar = ({ loggedIn = false }: any) => {
  return (
    <section
      className={`sidebar-catalog grid grid-cols-1 ${loggedIn ? 'minWidth ' : ' maxWidth'}`}
      style={{ width: loggedIn ? 125 : 234, height: loggedIn ? 1024 : '100%' }}
    >
      <div id="irn-logo" className=" pt-32 catalogo-logo">
        {loggedIn && <img src={`/media/irn-only.svg`} alt="" />}
        {!loggedIn && <img src={`/media/irn-logo.svg`} alt="" />}
      </div>
      {loggedIn && (
        <div className="my-32">
          <div id="menu" className='flex mx-8'>
            <LinkWrapper>
              <a href="/Catalogo/ListaServicos">
                <Icon name={'agora-line-dashboard'} aria-hidden />
              </a>
            </LinkWrapper>
            <LinkWrapper>
              <a href="/">
                <Icon name={'agora-line-document'} aria-hidden />
              </a>
            </LinkWrapper>
            <LinkWrapper>
              <a href="#">
                <Icon name={'agora-line-buildings'} aria-hidden />
              </a>
            </LinkWrapper>
            <LinkWrapper>
              <a href="#">
                <Icon name={'agora-solid-loader'} aria-hidden />
              </a>
            </LinkWrapper>
          </div>
          <div id="settings" className='flex mx-8 mt-32'>
            <LinkWrapper>
              <a href="#">
                <Icon name={'agora-line-bell'} aria-hidden />
              </a>
            </LinkWrapper>
            <LinkWrapper>
              <a href="#">
                <Icon name={'agora-line-user-group'} aria-hidden />
              </a>
            </LinkWrapper>

            <LinkWrapper>
              <a href="/Catalogo/Auth">
                <Icon name={'agora-line-hardware-settings'} aria-hidden />
              </a>
            </LinkWrapper>
          </div>
        </div>
      )}
    </section>
  )
}

export default SideBar
