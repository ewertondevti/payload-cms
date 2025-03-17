import React from 'react';
import { Width } from '../../Width';
import { FieldValues, UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { countryOptions } from '../../Country/options';
import { Select } from '../../Select';
import { TextField } from '@/components/ui/textfield';

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
  <div className="flex-wrap flex gap-32">
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
  </div>
 );
};

export default WeddingAddress;