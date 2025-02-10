'use client'

import { Icon } from '@ama-pt/agora-design-system'

type ContactLink = {
  label: string
  href: string
  icon: string
}

type Contact = {
  name: string
  description: string
  phone: string
}

type ContactsBannerProps = {
  heading: string
  text: string
  links: ContactLink[]
  contacts?: Contact[]
}

const ContactsBanner = ({ heading, text, links, contacts }: ContactsBannerProps) => {
  return (
    <div
      className="flex flex-col w-1/2 pr-80 px-20 py-10 w-2/3 h-90 self-end"
      style={{ backgroundColor: '#F2F6FF', paddingRight: '30rem' }}
    >
      <h2 className="font-semibold mb-6 text-blue-950 text-lg">{heading}</h2>
      <p className="text-blue-950">{text}</p>
      <i className="agora-line-calendar"></i>
      <div className="flex justify-between py-8">
        {links.map((link) => (
          <a href={link.href} className="inline-flex items-center text-blue-500 hover:underline">
            {link.label}
            <Icon name={link.icon} className="ml-2" />
          </a>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-semibold mb-3 text-blue-950">Contact name 1</p>
          <p className="mb-3 text-blue-950">description contact 1</p>
          <p className="text-blue-950">
            <span className="font-bold text-blue-950">000 000 000</span> or
            <span className="font-bold text-blue-950 ml-1">000 000 000</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold mb-3 text-blue-950">Contact name 2</p>
          <p className="mb-3 text-blue-950">description contact 2</p>
          <p className="text-blue-950">
            <span className="font-bold text-blue-950">000 000 000</span> or
            <span className="font-bold text-blue-950 ml-1">000 000 000</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactsBanner
