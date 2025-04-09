import type { Metadata } from 'next'

import { Noto_Sans } from 'next/font/google'
import React from 'react'

import '@ama-pt/agora-design-system/artifacts/dist/style.css'
import '@ama-pt/agora-design-system/artifacts/dist/tailwind.css'
import './globals.css'

import ClientLoaderWrapper from '@/components/ClientLoadWrapper'
import ClientModalWrapper from '@/components/ClientModalWrapper'
import ClientToastWrapper from '@/components/ClientToasterWrapper'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { routing } from '@/i18n/routing'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { TypedLocale } from 'payload'
import { initOtel } from '../../../../../art-cvt-react-common/src/otel'

initOtel({ local: true })

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  return (
    <html className={notoSans.className} lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        {/* <TelemetryProvider local /> */}

        <Providers>
          <NextIntlClientProvider messages={messages}>
            <ClientLoaderWrapper>
              <ClientToastWrapper>
                <ClientModalWrapper>
                  {/* <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            /> */}
                  <LivePreviewListener />

                  <Header locale={locale} />
                  {children}
                  <Footer locale={locale} />
                </ClientModalWrapper>
              </ClientToastWrapper>
            </ClientLoaderWrapper>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
