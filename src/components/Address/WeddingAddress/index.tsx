import React from 'react';

import { FieldValues, UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { countryOptions } from '../../Country/options';
import { Select } from '../../Select';
import { TextField } from '@/components/ui/textfield';
import { Width } from '../Width';

interface PlaceDateProps { }

const WeddingAddress: React.FC<
 PlaceDateProps & {
  errors: Partial<
   FieldErrorsImpl<{
    [x: string]: any;
   }>
  >;
  register: UseFormRegister<FieldValues>;
 }
> = ({ errors, register }) => {
 return (
  <div className="flex flex-col gap-32">
   <div className="flex gap-32 flex-wrap">
    <Width width={50}>
     <Select
      id={'cvtResidencia'}
      name={'cvtResidencia'}
      defaultValue="PT"
      type="text"
      label="Residência"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar país"
      dropdownAriaLabel="Lista de países"
      searchNoResultsText="Não foram encontrados resultados."
      required
     />
    </Width>
   </div>

   <div className='flex gap-32 flex-wrap'>
    <Width width={100}>
     <TextField
      id={'cvtMorada'}
      label="Morada"
      placeholder="Nome de rua ou avenida"
      required
      hasFeedback={true}
      feedbackState={'danger'}
      feedbackText={errors['cvtMorada']?.message?.toString()}
      validation={{
       pattern: {
        value: /^[\p{L}\d\s'-]+$/u,
        message: 'Morada inválida',
       },
      }}
      hasError={errors['cvtMorada'] ? true : false}
      register={register}
     />
    </Width>
   </div>

   <div className='flex gap-32 flex-wrap'>
    <Width width={50}>
     <TextField
      id={'cvtCodPostal'}
      hasError={errors['cvtCodPostal'] ? true : false}
      label="Código Postal"
      placeholder="Indique o código postal"
      required
      hasFeedback={true}
      feedbackState={'danger'}
      feedbackText={errors['cvtCodPostal']?.message?.toString()}
      validation={{
       pattern: {
        value: /^\d{4}-?\d{3}$/,
        message: 'Código postal inválido',
       },
      }}
      register={register}
     />
    </Width>

    <Width width={50}>
     <TextField
      id={'cvtLocalidade'}
      label="Localidade"
      placeholder="Indique a localidade"
      required
      hasFeedback={true}
      hasError={errors['cvtLocalidade'] ? true : false}
      feedbackState={'danger'}
      feedbackText={errors['cvtLocalidade']?.message?.toString()}
      validation={{
       pattern: {
        value: /^[\p{L}\s'-]+$/u,
        message: 'Localidade inválida',
       },
      }}
      register={register}
     />
    </Width>
   </div>

   <div className='flex gap-32 flex-wrap'>
    <Width width={50}>
     <Select
      name="district"
      label="Distrito"
      placeholder="Selecione um distrito"
      options={countryOptions}
      required
      hasError={!!errors.district}
     />
    </Width>
    <Width width={50}>
     <Select
      defaultValue="PT"
      type="text"
      label="Concelho"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar Concelho"
      dropdownAriaLabel="Lista de Concelhos"
      searchNoResultsText="Não foram encontrados resultados."
     />
    </Width>
   </div>
   <div className="flex gap-32 flex-wrap">
    <Width width={50}>
     <Select
      defaultValue="PT"
      type="text"
      label="Freguesia"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar Freguesia"
      dropdownAriaLabel="Lista de Freguesias"
      searchNoResultsText="Não foram encontrados resultados."
     />
    </Width>
   </div>
  </div >
 );
};

export default WeddingAddress;