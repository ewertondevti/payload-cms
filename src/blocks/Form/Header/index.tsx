import React from 'react'
import { Width } from '../Width'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { TextField } from '@/components/ui/textfield'

export interface HeaderProps {
    main: boolean;
    title: string;
    subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({
    main = true,
    title,
    subtitle
}) => {
  return (
    <div className='py-16'>
        {main ?
        (<div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl text-[#021C51]'>{title}</h1>
            <span className='font-semibold text-base text-[#2B363C]'>{subtitle}</span>
        </div>)
        : 
        (<div className='flex flex-col gap-2'>
            <h2 className='font-bold text-xl text-[#021C51]'>{title}</h2>
            <span className='font-semibold text-base text-[#2B363C]'>{subtitle}</span>
        </div>)
        }
    </div>
  )
}
