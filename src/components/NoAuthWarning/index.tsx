'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from '@ama-pt/agora-design-system'

const NoAuthWarning: React.FC = () => {

 return (
  <div className="bg-yellow-50 text-yellow-900 p-3 mt-3 min-h-[210px] flex items-center">
   <div className="flex flex-col mb-4">

    <div className="flex items-center  mt-3 gap-2">
     <Icon name="agora-solid-alert-circle" className='fill-[#FBBB3C]' />
     <span className='text-[16px] text-neutral-800 font-bold'>Não se encontra autenticado.</span>
    </div>

    <p className="text-[16px] ml-8 mt-3 text-neutral-800">
     Ao autenticar-se, os seus dados de identificação serão automaticamente preenchidos.
     Terá<br /> sempre acesso a todo o processo e poderá guardar o seu progresso, garantindo
     que nenhuma<br />informação já preenchida será perdida.
    </p>

    <Link href="#" className="text-yellow-900 flex items-center  mt-3 ml-8">
     Autenticação
     <Link href="#" className="text-yellow-900 flex items-center  gap-1">
      <Icon name="agora-line-arrow-right-circle" className='ml-3 fill-yellow-900' />
     </Link>
    </Link>
   </div>
  </div>
 )
}

export default NoAuthWarning