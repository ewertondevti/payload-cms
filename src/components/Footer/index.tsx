'use client'
import { PublicFooter } from '@ama-pt/agora-design-system'

interface FooterProps {
  locale: string
}
const Footer = (footerProps: FooterProps) => {
  const publicFooterArgs = {
    link: 'https://www.example.com',
    image: '',
    caption: 'Your caption here',
    partnersLogos: [
      {
        src: '',
        alt: 'Partner Logo 1 Alt Text',
        href: 'https://www.partner1.com',
        image: {
          src: '#',
          alt: 'Partner Logo 1 Alt Text',
        },
      },
      {
        src: '',
        alt: 'Partner Logo 2 Alt Text',
        href: 'https://www.partner2.com',
        image: {
          src: '#',
          alt: 'Partner Logo 1 Alt Text',
        },
      },
    ],
    copyright: '© 2023 Your Company',
    brandImage: {
      src: '',
      alt: 'Brand Image Alt Text',
      href: 'https://www.example.com',
      image: {
        src: '#',
        alt: 'Brand Image Alt Text',
      },
    },
  }
  return (
    <footer className="mt-auto">
      <PublicFooter {...publicFooterArgs} />
    </footer>
  )
}
export default Footer
