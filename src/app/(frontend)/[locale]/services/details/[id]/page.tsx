import configPromise from '@payload-config'
import React from 'react'

import { getPayload, TypedLocale } from 'payload'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getTranslations } from 'next-intl/server'
import CardHeroIndex from '@/components/CardHeroIndex'
import CustomButton from '@/components/CustomButton'
import RichText from '@/components/RichText'
import ContactsBanner from '@/components/Contacts'
import FindMore from '@/components/FindMore'

type Args = {
  params: Promise<{
    id: string
    locale: TypedLocale
  }>
}
export default async function Page({ params: paramsPromise }: Args) {
  const t = await getTranslations()
  const { id, locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const services = await payload.findByID({
    collection: 'services',
    id: id,
    depth: 1,
    locale: locale,
    overrideAccess: false,
  })
  const breadcrumbArgs = {}
  const cardarray: any[] = []
  services.abouttheservice?.aboutTheService?.forEach((element) => {
    const obj = {
      href: `#${element.title}`,
      children: element.title,
    }
    cardarray.push(obj)
  })
  const bread = [
    {
      label: 'Início',
      url: '#Lorem-0',
    },
    {
      label: 'Área de Registo',
      url: '#Lorem-0',
    },
    {
      label: 'Evento',
      url: '#Lorem-0',
    },
    {
      label: 'Início',
      url: '#Lorem-0',
    },
  ]

  function teste() {
    console.log('teste')
  }
  return (
    <>
      <div>
        <div className="relative bg-[var(--color-primary-900)] ">
          <div className="container mx-auto grid grid-cols-12 flex-row gap-x-20">
            <div className="flex flex-col col-span-7 gap-y-10 text-white mt-12">
              {/* <Breadcrumb darkMode items={bread} {...breadcrumbArgs} /> */}
              {/* <a className="text-m-regular">teste</a> */}
              <div className="flex flex-col gap-4">
                <a className="text-m-regular">Serviços Online</a>
                <h1 className="text-3xl-bold">{services.name}</h1>
                <p className="text-m-regular">{services.description}</p>
              </div>
              <p className="text-m-regular mb-16">
                {t('updated_in')}&nbsp;
                {formatDateTime(services.updatedAt)}
              </p>
            </div>
            <div className="absolute top-0 right-0  min-w-[360px] w-[488px] mb-20">
              <CardHeroIndex title={'Nesta Página'} index={cardarray} />
            </div>
          </div>
        </div>
        <div className="container mt-48">
          <div className="flex flex-row mt-12 justify-between items-center">
            <div className="flex flex-col gap-20">
              {services.abouttheservice?.aboutTheService!.map((e, index) => {
                return (
                  <div>
                    <div id={e.title}></div>
                    <section key={index} className="flex flex-col gap-10">
                      <h1 className="text-lg">{e.title}</h1>
                      <RichText
                        // className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-1 grid-rows-[1fr]"
                        content={e.content}
                        enableGutter={false}
                      />
                    </section>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col gap-4 self-start">
              <CustomButton
                variant="primary"
                appearance="solid"
                hasIcon
                trailingIcon="agora-line-arrow-right-circle"
                trailingIconHover="agora-solid-arrow-right-circle"
                label="Iniciar Pedido"
                href={'/serviceArea/' + id}
              />
              <CustomButton
                variant="primary"
                appearance="outline"
                self-start
                hasIcon
                trailingIcon="agora-line-calendar"
                trailingIconHover="agora-solid-calendar"
                label="Agendamento"
                href={'/agendamento'}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full mt-48">
          <ContactsBanner
            heading="Precisa de ajuda com este serviço?"
            text="Caso necessite de ajuda durante a realização do serviço, poderá utilizar qualquer um dos nossos canais de comunicação à sua disposição e sempre que necessário esclareça todas as dúvidas ou partilhe uma sugestão."
            links={[
              {
                label: 'Esclarecer uma dúvida',
                href: '/url-1',
                icon: 'agora-line-arrow-right-circle',
              },
              { label: 'Enviar Sugestão', href: '/url-2', icon: 'agora-line-arrow-right-circle' },
              { label: 'Ver contactos', href: '/url-3', icon: 'agora-line-arrow-right-circle' },
            ]}
          />
          <FindMore />
        </div>
      </div>
    </>
  )
}
