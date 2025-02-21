'use client'
import React, { useRef, useState } from 'react'
import './style.css'
import DropDownComponent from '../../../../components/Dropdown'
import CustomTable from '../../../../components/Table'
import { dummyCards, dummyHeader1, dummyTable1 } from './dummy'
import {
  Button,
  CardFrame,
  Dropdown,
  DropdownElement,
  DropdownOption,
  DropdownSection,
  Icon,
} from '@ama-pt/agora-design-system'
import { dummyDataTable, dummyHeaders } from '../Pedidos/dummy'

const AreaCidadao = () => {
  const ref = useRef<DropdownElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleVisibility = () => {
    if (ref.current?.visibility) {
      ref.current?.hide()
    } else {
      ref.current?.show()
    }
  }

  const handleKeydown = (evt: any) => {
    const code = evt.code

    if (code === 'Escape' && ref.current?.visibility) {
      ref.current.hide()
    }

    if (code === 'Enter' || code === 'Space' || code === 'NumpadEnter') {
      toggleVisibility()
    }
  }

  const handleClick = (evt: any) => {
    console.log(evt)

    if (typeof evt.detail === 'number' && evt.detail === 0) {
      //  EVENT DETAIL IS THE NUMBER OF CLICKS. KEYBOARD DOES NOT ADD A CLICK COUNTER.
      //  KEYBOARD IS HANDLED ON KEYDOWN
      return
    }

    toggleVisibility()
  }

  const handleShow = () => {
    setIsExpanded(true)
    ref.current?.first()
  }

  const handleHide = () => {
    setIsExpanded(false)
    buttonRef.current?.focus()
  }
  return (
    <div className="container mx-auto my-32 reserved-area citizen" style={{ padding: 50 }}>
      <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
        <div className="title">
          <h2>O meu registo individual</h2>
          <p className="subtitle">Os documentos de registo individual do cidadão num só lugar</p>
        </div>
        <div className="w-1/2" style={{maxWidth: 300 }}>
          <Button
            id="dropdown-toggle-button"
            className=" w-full bg-primary-500 hover:bg-primary-900 active:bg-primary-700 text-white h-[80px]"
            onClick={handleClick}
            onKeyDown={handleKeydown}
            role="combobox"
            appearance="outline"
            aria-controls="my-dropdown"
            aria-expanded={isExpanded}
            aria-label="toggle dropdown"
          >
            <span aria-hidden className="flex" style={{ justifyContent: 'space-around' }}>
              {' '}
              Trocar área de Registo
              <Icon
                name={isExpanded ? 'agora-line-chevron-up' : 'agora-line-chevron-down'}
                aria-hidden
                style={{ marginLeft: 10 }}
              />
            </span>
          </Button>
          <div className="bg-neutral-500 relative w-full">
            <Dropdown
              ref={ref}
              onShow={handleShow}
              onHide={handleHide}
              id="my-dropdown"
              aria-label="selecione a area de registo"
              optionsVisible={5}
            >
              <DropdownSection label="Areas de registo" name="areas">
                <DropdownOption value={'Nascimento'}>Nascimento</DropdownOption>
                <DropdownOption value={'Divorcio'}>Divorcio e Separação</DropdownOption>
                <DropdownOption value={'Documentos'}>Documentos</DropdownOption>
                <DropdownOption value={'Nacionalidade'}>Nacionalidade</DropdownOption>
              </DropdownSection>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className=" container mx-auto my-32" style={{ marginBottom: 200 }}>
        <div className="title">
          <h3>Lista de documentos</h3>
          <p className="subtitle">A sua lisa de documentos reservados à área do cidadão</p>
        </div>
        <div>
          <CustomTable args={dummyTable1} headers={dummyHeader1}/>
        </div>
      </div>

      <div style={{ marginBottom: 200 }}>
        <div className="title">
          <h3>Lista de pedidos</h3>
          <p className="subtitle">A sua lisa de pedidos reservada à área do cidadão</p>
        </div>
        <div>
          <CustomTable args={dummyDataTable} headers={dummyHeaders}/>
        </div>
      </div>

      <div style={{ marginBottom: 200 }} className="user-area">
        <div className="title">
          <h3>Serviços online</h3>
          <p className="subtitle">Veja outros eventos disponiveis na Àrea de Registo</p>
        </div>
        <div className="grid-container">
          {dummyCards.map((card: any, index) => (
            <div style={{ maxWidth: 1000 }} key={index}>
              <CardFrame
                label={card.title}
                headingLevel="h2"
                mainAnchor={{
                  children: 'Open link',
                  href: card.link,
                  target: '_blank',
                  iconOnly: true,
                  hasIcon: true,
                }}
              >
                <p>{card.description}</p>
              </CardFrame>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AreaCidadao
