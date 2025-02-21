'use client'
import {
  Breadcrumb,
  Button,
  Checkbox,
  CheckboxGroup,
  DropdownOption,
  DropdownSection,
  Icon,
  InputDate,
  InputNumber,
  InputSelect,
  InputText,
  LinkWrapper,
  Switch,
  Toggle,
} from '@ama-pt/agora-design-system'
import React, { useId, useState } from 'react'
import './style.css'
import SideBar from '@/components/SideBarCatalogo'
import { redirect } from 'next/navigation'

const Args: any = {
  calendarIconAriaLabel: 'Open calendar picker overlay',
  previousYearAriaLabel: 'Navigate previous year',
  previousMonthAriaLabel: 'Navigate previous month',
  nextMonthAriaLabel: 'Navigate next month',
  nextYearAriaLabel: 'Navigate next year',

  todayDayAriaLabel: 'Hoje',
  focusedDayAriaLabel: 'focused',
  selectedDayAriaLabel: 'Selecionado',

  todayLabel: 'Hoje',
  cancelLabel: 'Cancelar',
  okLabel: 'OK',
  todayAriaLabel: 'Navegar para Hoje',
  cancelAriaLabel: 'Cancelar selecção',
  okAriaLabel: 'Selecionar dia focado',

  dayInputPlaceholder: 'dd',
  monthInputPlaceholder: 'mm',
  yearInputPlaceholder: 'yyyy',

  monthsLabels: {
    jan: 'Janeiro',
    fev: 'Fevereiro',
    mar: 'Março',
    abr: 'Abril',
    mai: 'Maio',
    jun: 'Junho',
    jul: 'Julho',
    ago: 'Augosto',
    set: 'Setembro',
    out: 'Outubro',
    nov: 'Novembro',
    dec: 'Dezembro',
  },

  weekdaysLabels: {
    dom: 'Domingo',
    seg: 'Segunda',
    ter: 'Terça',
    qua: 'Quarta',
    qui: 'Quinta',
    sex: 'Sexta',
    sab: 'Sabado',
  },
}

const DetalhesServico = () => {
  const [isInterno, setIsInterno] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [isPostal, setIsPostal] = useState(false)
  const [isPresencial, setIsPresencial] = useState(false)

  const changeInternoState = () => {
    console.log('interno')
    setIsInterno((prev) => !prev)
  }
  const changeOnlineState = () => {
    console.log('online')
    setIsOnline((prev) => !prev)
  }
  const changePostalState = () => {
    console.log('postal')
    setIsPostal((prev) => !prev)
  }
  const changePresencialState = () => {
    console.log('presencial')
    setIsPresencial((prev) => !prev)
  }

  return (
    <div className="flex">
      <div>
        <SideBar loggedIn={true} />
      </div>
      <div id="service-details" className="mx-32 my-32 w-full">
        <section id="breadcrumb" className="flex rows mb-32">
          <Breadcrumb
            className="mx-32"
            items={[
              {
                label: 'Área de configurações ',
                url: '#',
              },
              {
                label: 'Catálogo de Serviços',
                url: '/ListaServico',
              },
              {
                label: 'Serviço A',
                url: '#',
              },
            ]}
          />
        </section>
        <section id="titles" className="mb-32">
          <div>
            <h3 className="mb-32">Serviço A</h3>
          </div>
        </section>

        <div className="w-full">
          <h6>Data e Versões</h6>
          <section id="about" className="flex about-section w-full bg-color-1">
            <div className="flex row version ml-8">
              <p className="mx-4">
                <strong>Data de criação: </strong> 01/01/2024
              </p>
              <p className="mx-4">
                <strong>Última versão: </strong> 01/01/2025
              </p>
              <p className="mx-4">
                <strong>Versão: </strong> 1.0
              </p>
            </div>
            <div className="flex row history">
              <p className="mx-4">Histórico de versões </p>
              <Icon className="mx-4" name={'agora-solid-book-open'} aria-hidden />
            </div>
          </section>

          <section id="detalhe-servico" className="w-full my-32 details">
            <h6 className="my-8">Detalhe do serviço</h6>
            <div className="columns w-full bg-color-1 mb-8 py-8 px-8">
              <div className="flex description w-full">
                <strong className="mx-8">Descrição do serviço</strong>
                <InputText placeholder="Nome do Serviço" />
              </div>
              <div id="estrutura" className="flex w-full  mt-8" style={{justifyContent: 'space-between'}}>
                <strong className="mx-8 mt-4">Estrutura no catálogo</strong>
                <div className="flex inputs">
                  <div>
                    <InputSelect placeholder="Ciclo de Vida" type="text" onChange={() => {}}>
                      {[
                        <DropdownSection key={'randomkey-1'} name={'Ciclo de vida'}>
                          <DropdownOption key={`my-input-select-1-0-0`} selected value="Ciclo1">
                            Ciclo de vida 1
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-2-0-0`} value="Ciclo2">
                            Ciclo de vida 2
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-3-0-0`} value="Ciclo3">
                            Ciclo de vida 3
                          </DropdownOption>
                        </DropdownSection>,
                      ]}
                    </InputSelect>
                    <InputText className="my-8" placeholder="Natureza" />
                  </div>
                  <div className="mx-8">
                    <InputSelect placeholder="Evento" type="text" onClick={() => {}}>
                      {[
                        <DropdownSection key={'randomkey-1'} name={'Evento'}>
                          <DropdownOption key={`my-input-select-1-0-0`} value="Evento1">
                            Evento 1
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-2-0-0`} selected value="Evento2">
                            Evento 2
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-3-0-0`} value="Evento3">
                            Evento 3
                          </DropdownOption>
                        </DropdownSection>,
                      ]}
                    </InputSelect>
                    <InputText className="my-8" placeholder="Variante" />
                  </div>
                  <div>
                    <InputSelect placeholder="Padrão " type="text">
                      {[
                        <DropdownSection key={'randomkey-1'} name={'Padrão'}>
                          <DropdownOption key={`my-input-select-1-0-0`} value="Padrão1">
                            Padrão 1
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-2-0-0`} value="Padrão2">
                            Padrão 2
                          </DropdownOption>
                          <DropdownOption key={`my-input-select-3-0-0`} selected value="Padrão3">
                            Padrão 3
                          </DropdownOption>
                        </DropdownSection>,
                      ]}
                    </InputSelect>
                    <InputText className="my-8" placeholder="Facto" />
                  </div>
                </div>
              </div>
              <div id="estado" className="flex w-full mt-32 states">
                <strong className="mx-8 ">Estado</strong>
                <div id="chkbx" className="flex row ">
                  <Checkbox label="Activo" value="true" />
                  <Checkbox label="Inactivo" value="false" />
                </div>
                <div className="flex dates">
                  <p className="mx-4">Data de início</p>
                  <InputDate {...Args} />
                </div>
                <div className="flex activation ml-6">
                  <Checkbox className="mt-4" />
                  <p className="">Ativar automáticamente </p>
                </div>
              </div>
            </div>
          </section>

          <section id="caracteristicas-servico" className="w-full my-8">
            <h6 className="my-16">Características do serviço</h6>
            <div className="columns w-full bg-color-1 justify-component bg-color-1 py-8 px-8">
              <div className="flex w-full">
                <strong className="mx-8">Descrição jurídica</strong>
                <InputText placeholder="Descrição" style={{ minWidth: 600 }} />
              </div>
              <div className="flex mt-16">
                <strong className="mx-8">Prazos legais</strong>
                <div className="columns">
                  <div className="flex mx-8">
                    <div className="flex">
                      <InputNumber placeholder="€0.00" />
                      <p className="ml-8 ">Dias </p>
                    </div>
                    <div className="flex ml-16">
                      <p className="mr-8">Emolumentos </p>
                      <InputText placeholder="€0.00" />
                    </div>
                    <div className="flex ml-16">
                      <p className="mr-8">SLA Resposta </p>
                      <InputText placeholder="5 dias" />
                    </div>
                  </div>
                  <div className="flex mt-8">
                    <div className="flex ml-8">
                      <InputText placeholder="€0.00" />
                      <p className="ml-8 ">Taxa de urgência </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="isencoes" className="flex mt-16">
                <strong className="mx-8 mt-8">Isenções</strong>
                <div className="flex">
                  <InputSelect placeholder="Selecione" type="text" onClick={() => {}}>
                    {[
                      <DropdownSection key={'randomkey-1'} name={'isenção'}>
                        <DropdownOption key={`my-input-select-1-0-0`} value="isenção1">
                          Isenção 1
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-2-0-0`} value="isenção2">
                          Isenção 2
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-3-0-0`} selected value="Isenção3">
                          Isenção 3
                        </DropdownOption>
                      </DropdownSection>,
                    ]}
                  </InputSelect>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32 ">
            <h6 className="my-32">Canais</h6>
            <div className="columns w-full bg-color-1 px-8">
              <div className="flex w-full pt-8">
                <strong className=" mr-8">Serviços internos</strong>{' '}
                <div className="flex ml-16 toggles">
                  <Toggle
                    className="custom-toogle-1"
                    variant="neutral"
                    disabled={isInterno}
                    children="Não"
                    onChange={() => changeInternoState()}
                  />
                  <Toggle
                    className="custom-toogle-2"
                    variant="neutral"
                    disabled={!isInterno}
                    children="Sim"
                    onChange={() => changeInternoState()}
                  />
                </div>
              </div>
              <div className="flex mt-16 w-full servico mb-32">
                <strong className="mt-8">Publico alvo</strong>
                <div className="flex ml-16">
                  <InputSelect placeholder="Selecione" type="text" onClick={() => {}}>
                    {[
                      <DropdownSection key={'randomkey-1'} name={'Padrão'}>
                        <DropdownOption key={`my-input-select-1-0-0`} value="Publico 1">
                          publico 1
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-2-0-0`} value="publico2">
                          publico 2
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-3-0-0`} selected value="publico3">
                          publico 3
                        </DropdownOption>
                      </DropdownSection>,
                    ]}
                  </InputSelect>
                </div>
              </div>

              <div className="flex w-full">
                <strong className=" mr-32">Online</strong>{' '}
                <div className="flex">
                  <div className="flex ml-8">
                    <Toggle
                      className="custom-toogle-1"
                      variant="neutral"
                      disabled={!isOnline}
                      checked={!isOnline ? true : false}
                      children="Não"
                      onChange={() => changeOnlineState()}
                    />
                    <Toggle
                      className="custom-toogle-2"
                      variant="neutral"
                      disabled={!isOnline ? true : false}
                      checked={isOnline}
                      children="Sim"
                      onChange={() => changeOnlineState()}
                    />
                  </div>
                  <p className="ml-16">
                    (Deve configurar regras de distribuição para este novo serviço)
                  </p>
                </div>
              </div>

              <div className="flex w-full">
                <strong className="mt-16 mr-32">Postal</strong>{' '}
                <div className="flex ml-8 mt-16">
                  <div className="flex">
                    <Toggle
                      className="custom-toogle-1"
                      variant="neutral"
                      disabled={isPostal}
                      children="Não"
                      onChange={() => changePostalState()}
                    />
                    <Toggle
                      className="custom-toogle-2"
                      variant="neutral"
                      disabled={!isPostal}
                      children="Sim"
                      onChange={() => changePostalState()}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <strong className="mt-16 mr-32">Presencial</strong>{' '}
                <div className="flex mt-16">
                  <div className="flex toggles">
                    <Toggle
                      className="custom-toogle-1"
                      variant="neutral"
                      disabled={isPresencial}
                      checked={!isPresencial ? true : false}
                      children="Não"
                      onChange={() => changePresencialState()}
                    />
                    <Toggle
                      className="custom-toogle-2"
                      variant="neutral"
                      disabled={!isPresencial ? true : false}
                      checked={isPresencial}
                      children="Sim"
                      onChange={() => changePresencialState()}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto mt-32">
                <p>Selecione na tabela infra onde se pode tratar do serviço presencialmente:</p>
                <div className="flex toggles mt-16">
                  <Toggle
                    variant="neutral"
                    children="Todas"
                    onChange={() => console.log('clicked')}
                    className="mx-4"
                  />
                  <Toggle
                    variant="neutral"
                    children="Civil"
                    onChange={() => console.log('clicked')}
                    className="mx-4"
                  />
                  <Toggle
                    variant="neutral"
                    children="Comercial"
                    onChange={() => console.log('clicked')}
                    className="mx-4"
                  />
                  <Toggle
                    variant="neutral"
                    children="Predial"
                    onChange={() => console.log('clicked')}
                    className="mx-4"
                  />
                  <Toggle
                    variant="neutral"
                    children="Automóvel"
                    onChange={() => console.log('clicked')}
                    className="mx-4"
                  />
                </div>
                <div className="w-1/4 mt-16">
                  <InputSelect type="checkbox" placeholder="Selecionar Conservatória(s)">
                    {[
                      <DropdownSection
                        key={`my-input-select-0-${0}`}
                        label="Conservatórias"
                        name="convervatórias"
                      >
                        <DropdownOption
                          key={`my-input-select-1-${0}-0`}
                          selected
                          value="Aveiro (região)"
                        >
                          Aveiro (região)
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-2-${0}-1`} value="Aveiro">
                          CRC Aveiro
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-3-${0}-2`} value="crc">
                          CRC
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-4-${0}-3`} value="feira">
                          CRC Feira
                        </DropdownOption>
                      </DropdownSection>,
                    ]}
                  </InputSelect>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <h6 className="my-8">Formas de pagamento</h6>
            <div className=" bg-color-1 px-32">
              <div className="flex mt-8">
                <div className="flex">
                  <div className="flex">
                    <Checkbox label="Referência Multibanco" value="false" />
                  </div>
                  <div className="flex ml-16">
                    <Checkbox label="Cartão Visa" value="false" />
                  </div>
                  <div className="flex ml-16">
                    <Checkbox label="MBway" value="false" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="documentos" className="mb-32">
            <h6 className="my-8">Documentos</h6>
            <div className="columns w-full bg-color-1 px-32">
              <div className="flex mt-16 w-full mb-32">
                <strong className="mt-8 mr-8">Documentos necessários</strong>
                <div className="flex">
                  <InputSelect placeholder="Selecione" type="text" onClick={() => {}}>
                    {[
                      <DropdownSection
                        key={`my-input-select-0-${0}`}
                        label="Documentos"
                        name="Documentos"
                      >
                        <DropdownOption
                          key={`my-input-select-1-${0}-0`}
                          selected
                          value="Documento1"
                        >
                          Documento 1
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-2-${0}-1`} value="Documento2">
                          Documento 2
                        </DropdownOption>
                        <DropdownOption key={`my-input-select-3-${0}-2`} value="Documento3">
                          Documento 3
                        </DropdownOption>
                      </DropdownSection>,
                    ]}
                  </InputSelect>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <h6 className="my-8">Formulário</h6>
            <div className="columns w-full bg-color-1 px-16">
              <div className="flex mt-16 w-full mb-8" style={{ justifyContent: 'space-between' }}>
                <div className="flex">
                  <strong className=" mr-16">Formulário associado</strong>
                  <span className="flex ">
                    Formulário.form{' '}
                    <Icon className="mx-16 ml-8" name={'agora-line-document'} aria-hidden />
                  </span>
                </div>
                <div className="flex ">
                  <a href="/Formulario" className="flex">
                    Configurador de formulário{' '}
                    <Icon className="mx-16" name={'agora-line-arrow-right-circle'} aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <h6 className="my-8">Processo</h6>
            <div className="columns w-full bg-color-1 px-32">
              <div className="flex mt-16 w-full mb-8" style={{ justifyContent: 'space-between' }}>
                <div className="flex">
                  <strong>Processo associado</strong>
                  <span className="ml-8 flex">
                    Processo.UML{' '}
                    <Icon className="mx-16 ml-8" name={'agora-line-document'} aria-hidden />
                  </span>
                </div>
                <div className="flex">
                  Configurador de processo{' '}
                  <Icon className="mx-16 ml-8" name={'agora-line-arrow-right-circle'} aria-hidden />
                </div>
              </div>
            </div>
          </section>
          <section
            id="btns-form"
            className=" flex my-32"
            style={{ justifyContent: 'end', maxWidth: 1100 }}
          >
            <Button
              children="Cancelar"
              appearance="link"
              onClick={() => redirect('/Catalogo/ListaServicos')}
            />
            <Button children="Guardar" onClick={() => redirect('/Catalogo/ListaServicos')} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default DetalhesServico