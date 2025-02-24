'use client'

import React from 'react'
import { InputText } from '@ama-pt/agora-design-system'
import Image from 'next/image'
import { UseFormReturn, FieldValues } from 'react-hook-form'

type AccessVerificationProps = {
 accessCode: {
  placeholder: string
  required: boolean
  label: string
 }
 captcha: {
  placeholder: string
  required: boolean
  label: string
  imageSrc: string
 }
} & UseFormReturn<FieldValues>

export const BirthConsultation: React.FC<AccessVerificationProps> = ({
 accessCode,
 captcha,
 register,
 formState: { errors }
}) => {
 return (
  <div className="space-y-6">
   <div>
    <h2 className="text-lg font-semibold">Código de acesso</h2>
    <p className="text-sm text-gray-600">Insira o código de acesso</p>
    <div className="grid grid-cols-3 gap-4 mt-2">
     <InputText
      id="accessCode1"
      placeholder={accessCode.placeholder}
      {...register('accessCode1', { required: true })}
      hasError={!!errors.accessCode1}
      feedbackState="danger"
     />
     <InputText
      id="accessCode2"
      placeholder={accessCode.placeholder}
      {...register('accessCode2', { required: true })}
      hasError={!!errors.accessCode2}
      feedbackState="danger"
     />
     <InputText
      id="accessCode3"
      placeholder={accessCode.placeholder}
      {...register('accessCode3', { required: true })}
      hasError={!!errors.accessCode3}
      feedbackState="danger"
     />
    </div>
    {errors.accessCode1 && <p className="text-red-500 text-sm">Código inválido</p>}
   </div>

   <div>
    <h2 className="text-lg font-semibold">Código de verificação</h2>
    <p className="text-sm text-gray-600">Insira os caracteres que vê na imagem</p>
    <div className="flex items-center space-x-4 mt-2">
     <Image
      src={captcha.imageSrc}
      alt="Captcha"
      width={120}
      height={40}
      className="border rounded"
     />
     <InputText
      id="captcha"
      placeholder={captcha.placeholder}
      {...register('captcha', { required: true })}
      hasError={!!errors.captcha}
      feedbackState="danger"
     />
    </div>
    {errors.captcha && <p className="text-red-500 text-sm">Captcha incorreto</p>}
   </div>
  </div>
 )
}
