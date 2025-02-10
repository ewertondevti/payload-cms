'use client'

import {
  Area,
  Areas,
  Brand,
  DefaultSearch,
  GeneralBar,
  HeaderV2,
  InputSearchBar,
  Institutional,
  Language,
  Languages,
  Logo,
  NavigationBar,
  NavigationLink,
  NavigationLinkProps,
  NavigationRoot,
  NavigationRootProps,
  RelatedNavigationLink,
  Search,
  SearchInputContainer,
  SearchRelatedLink,
  SearchRelatedLinks,
  SearchRelatedLinksTitle,
  SearchTitle,
  Unauthenticated,
  UnauthenticatedLink,
  useBreakpointScreenValues,
  useWindowSize,
} from '@ama-pt/agora-design-system'
import { ReactElement, useMemo, useState } from 'react'

const LOGO = '/api/media/file/irn-logo.png'
const LOGO_DARK = '/api/media/file/irn-logo-white.png'
const PT_FLAG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzk2MjJfMjcxMyIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IndoaXRlIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF85NjIyXzI3MTMpIj4KPHBhdGggZD0iTTMyIDE2QzMyIDcuMTYzNDQgMjQuODM2NiAwIDE2IDBWMzJDMjQuODM2NiAzMiAzMiAyNC44MzY2IDMyIDE2WiIgZmlsbD0iI0UyMDAxMSIvPgo8cGF0aCBkPSJNMCAxNkMwIDcuMTYzNDQgNy4xNjM0NCAwIDE2IDBWMzJDNy4xNjM0NCAzMiAwIDI0LjgzNjYgMCAxNloiIGZpbGw9IiMwMDYxMzQiLz4KPC9nPgo8L3N2Zz4K'
const EN_FLAG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzk2MjJfNzkwIiBzdHlsZT0ibWFzay10eXBlOmFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0id2hpdGUiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzk2MjJfNzkwKSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSIjMEIzNkFBIi8+CjxyZWN0IHg9IjIuNTY1NDMiIHk9IjYuODA3NjIiIHdpZHRoPSI2IiBoZWlnaHQ9IjMyIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMi41NjU0MyA2LjgwNzYyKSIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMy45Nzk0OSIgeT0iNS4zOTMzNyIgd2lkdGg9IjIiIGhlaWdodD0iMzIiIHRyYW5zZm9ybT0icm90YXRlKC00NSAzLjk3OTQ5IDUuMzkzMzcpIiBmaWxsPSIjRTIwMDExIi8+CjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjMyIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxMDcgLTAuNzA3MTA3IC0wLjcwNzEwNyAwLjcwNzEwNyAyOS40MzQ2IDYuODA3NjIpIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIzMiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MTA3IC0wLjcwNzEwNyAtMC43MDcxMDcgMC43MDcxMDcgMjguMDIwNSA1LjM5MzM3KSIgZmlsbD0iI0UyMDAxMSIvPgo8cmVjdCB4PSIxMiIgd2lkdGg9IjgiIGhlaWdodD0iMzIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHk9IjIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIzMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDAgMjApIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB5PSIxOCIgd2lkdGg9IjQiIGhlaWdodD0iMzIiIHRyYW5zZm9ybT0icm90YXRlKC05MCAwIDE4KSIgZmlsbD0iI0UyMDAxMSIvPgo8cmVjdCB4PSIxNCIgd2lkdGg9IjQiIGhlaWdodD0iMzIiIGZpbGw9IiNFMjAwMTEiLz4KPC9nPgo8L3N2Zz4K'

interface HeaderProps {
  locale: string
}
const Header = (headerProps: HeaderProps) => {
  const wrapperClassNames = 'min-h-[100vh] max-w-[1440px] mx-auto flex flex-col'
  const [selectedLang, setSelectedLang] = useState('PT')

  const { width } = useWindowSize()
  const { xlScreen } = useBreakpointScreenValues()
  const isDesktop = width >= xlScreen

  const handleLanguageChange = (val: string) => {
    setSelectedLang(val)
  }

  const headerArgs = {
    darkMode: true,
  }

  const [selectedArea, setSelectedArea] = useState('area-1')
  const handleAreaChange = (val: string) => {
    setSelectedArea(val)
  }
  const activeNavigationItems = useMemo(() => {
    let ret: Array<ReactElement<NavigationRootProps | NavigationLinkProps>> = []

    if (selectedArea === 'area-1') {
      ret = [
        <NavigationRoot
          key={1}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Cidadão"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Casamento
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Divórcio e Segaração
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Documentos
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Nacionalidade
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://localhost:3000/lifecycles/cvc" target="_blank" rel="noreferrer">
              Nascimento
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Óbito
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationRoot
          key={2}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Empresa"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 5
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationLink key={3}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer" aria-current="page">
            Prédios
          </a>
        </NavigationLink>,
        <NavigationLink key={4}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Veículos
          </a>
        </NavigationLink>,
        <NavigationLink key={5}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Serviços Complementares
          </a>
        </NavigationLink>,
      ]
    }

    if (selectedArea === 'area-2') {
      ret = [
        <NavigationRoot
          key={6}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 2 - Menu 1"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 5
            </a>
          </NavigationLink>

          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 1
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 2
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 3
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 4
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 5
            </a>
          </RelatedNavigationLink>
        </NavigationRoot>,
        <NavigationRoot
          key={7}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 2 - Menu 2"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 5
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationLink key={8}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer" aria-current="page">
            Area 2 - Direct Link 1
          </a>
        </NavigationLink>,
        <NavigationLink key={9}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 2 - Direct Link 2
          </a>
        </NavigationLink>,
        <NavigationLink key={10}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 2 - Direct Link 3
          </a>
        </NavigationLink>,
      ]
    }

    return ret
  }, [selectedArea])
  return (
    <header className="sticky top-0 z-sticky">
      <HeaderV2 {...headerArgs}>
        <Brand>
          <Logo>
            <a href={process.env.NEXT_PUBLIC_SERVER_URL} rel="noreferrer">
              <img src={headerArgs.darkMode ? LOGO_DARK : LOGO} alt="Logo alternative text" />
            </a>
          </Logo>
          <Institutional>Consigo em cada Registo</Institutional>
        </Brand>

        <GeneralBar aria-label="Utilities menu">
          <Languages aria-label="Language list" onChange={handleLanguageChange}>
            <Language
              checked={selectedLang === 'PT'}
              value={'PT'}
              icon={PT_FLAG}
              label="Portuguese"
              abbr="PT"
            />
            <Language
              checked={selectedLang === 'EN'}
              value={'EN'}
              icon={EN_FLAG}
              label="English"
              abbr="EN"
            />
          </Languages>

          <Areas aria-label="Areas menu" onChange={handleAreaChange}>
            <Area label="irn.justica.gov.pt" value="area-1" active={selectedArea === 'area-1'} />
            <Area label="Área Reservada" value="area-2" active={selectedArea === 'area-2'} />
          </Areas>

          <Search label="Search">
            <DefaultSearch>
              <SearchTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</SearchTitle>
              <SearchInputContainer>
                <InputSearchBar label="Search term" />
              </SearchInputContainer>
              <SearchRelatedLinks>
                <SearchRelatedLinksTitle>
                  Vero laborum quis ratione. Cum ea praesentium temporibus sint maiores!
                </SearchRelatedLinksTitle>
                <SearchRelatedLink>
                  <a target="_blank" rel="noreferrer" href="https://www.example.com">
                    Related Link 1
                  </a>
                </SearchRelatedLink>
                <SearchRelatedLink>
                  <a target="_blank" rel="noreferrer" href="https://www.example.com">
                    Related Link 2
                  </a>
                </SearchRelatedLink>
                <SearchRelatedLink>
                  <a target="_blank" rel="noreferrer" href="https://www.example.com">
                    Related Link 3
                  </a>
                </SearchRelatedLink>
                <SearchRelatedLink>
                  <a target="_blank" rel="noreferrer" href="https://www.example.com">
                    Related Link 4
                  </a>
                </SearchRelatedLink>
                <SearchRelatedLink>
                  <a target="_blank" rel="noreferrer" href="https://www.example.com">
                    Related Link 5
                  </a>
                </SearchRelatedLink>
              </SearchRelatedLinks>
            </DefaultSearch>
          </Search>

          <Unauthenticated>
            <UnauthenticatedLink
              hasIcon
              leadingIcon="agora-line-user"
              leadingIconHover="agora-solid-user"
            >
              <a target="_blank" rel="noreferrer" href="https://www.example.com">
                <span>Login</span>
              </a>
            </UnauthenticatedLink>
          </Unauthenticated>
        </GeneralBar>

        <NavigationBar
          responsiveMenuLabel="Menu"
          responsiveMenuAriaLabel="Main navigation menu"
          responsiveMenuBackToRootLabel="Back"
          modalMenuLabel="Menu"
          modalAriaLabel="Main navigation modal"
          modalCloseLabel="Close"
        >
          {activeNavigationItems}
        </NavigationBar>
      </HeaderV2>
    </header>
  )
}
export default Header
