import React, { useState, useEffect } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { TextField } from '@/components/ui/textfield'
import { InputSelect } from '@/components/ui/inputSelect'
import { idDocumentOptions } from '../IdDocument/options'
import { countryOptions } from '../Country/options'
import { useFormContext } from 'react-hook-form'
import { InputNumber, InputTextArea, RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'

export interface BirthCertificateDataProps {
    name: string
}

export const BirthCertificateData: React.FC<
    BirthCertificateDataProps & {
        errors: Partial<
            FieldErrorsImpl<{
                [x: string]: any
            }>
        >
        register: UseFormRegister<FieldValues>
    }
> = ({ name, errors, register }) => {
    const { setValue } = useFormContext()
    const [selectedIdDocument, setSelectedIdDocument] = useState<string>('cc')
    const [selectedValue, setSelectedValue] = useState<string | undefined>('data')
    const [selectedCountry, setSelectedCountry] = useState<string>('PT')

    const onChangeIdDocument = (value: string) => {
        setSelectedIdDocument(value)
        setValue('cvtDocumento', value)
    }
    const onChangeCountry = (value: string) => {
        setSelectedCountry(value)
        setValue('cvtResidencia', value)
    }

    useEffect(() => {
        register('cvtDocumento', { value: selectedIdDocument })
        register(`cvtResidencia`, { value: selectedCountry })
    }, [])

    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-8'>
                <h2 className='font-bold text-xl text-[#021C51]'>Dados de identificação</h2>
                <TextField
                    id='cvtNomeBirthCertificate'
                    label="Nome completo"
                    placeholder="Indique o seu nome completo"
                    required
                    hasFeedback={true}
                    feedbackState={'danger'}
                    feedbackText={errors['cvtNomeBirthCertificate']?.message?.toString()}
                    validation={{
                        pattern: {
                            value: /^[\p{L}\d\s'-]+$/u,
                            message: 'Nome inválido',
                        },
                    }}
                    hasError={errors['cvtNomeBirthCertificate'] ? true : false}
                    register={register}
                />
                <div className='grid grid-cols-2 gap-4 overflow-hidden'>
                    <InputSelect
                        id='cvtDocumentoBirthCertificate'
                        label="Documento de identificação"
                        value={selectedIdDocument}
                        type="text"
                        options={idDocumentOptions}
                        placeholder="Selecione uma opção"
                        hideSectionNames
                        onChange={onChangeIdDocument}
                    />
                    <TextField
                        id='cvtNrDocumentoBirthCertificate'
                        label="Número do documento"
                        placeholder="Indique o número do documento"
                        required
                        hasFeedback={true}
                        feedbackState={'danger'}
                        feedbackText={errors['cvtNrDocumento']?.message?.toString()}
                        validation={{
                            pattern: {
                                value: /^[\p{L}\d\s'-]+$/u,
                                message: 'Número de documento inválido',
                            },
                        }}
                        hasError={errors[name + 'NrDocumento'] ? true : false}
                        register={register}
                    />
                    <TextField
                        id='cvtDigitoIdentitifcacaoBirthCertificate'
                        label="Digito de verificação"
                        placeholder="Indique o digito de verificação"
                        required
                        hasFeedback={true}
                        feedbackState={'danger'}
                        feedbackText={errors['cvtDigitoIdentitifcacaoBirthCertificate']?.message?.toString()}
                        validation={{
                            pattern: {
                                value: /^[\p{L}\d\s'-]+$/u,
                                message: 'Número de digito de verificação inválido',
                            },
                        }}
                        hasError={errors['cvtDigitoIdentitifcacaoBirthCertificate'] ? true : false}
                        register={register}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <h2 className='font-bold text-xl text-[#021C51]'>Dados do registo</h2>
                <div className='grid grid-cols-2 gap-4'>
                    <TextField
                        id='cvtNumeroAnoRegistoBirthCertificate'
                        label="Número / ano do registo"
                        placeholder="Indique o número / ano do registo"
                        required
                        hasFeedback={true}
                        feedbackState={'danger'}
                        feedbackText={errors['cvtNumeroAnoRegisto']?.message?.toString()}
                        validation={{
                            pattern: {
                                value: /^[\p{L}\d\s'-]+$/u,
                                message: 'Nome inválido',
                            },
                        }}
                        hasError={errors['cvtNumeroAnoRegisto'] ? true : false}
                        register={register}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <RadioButtonGroup
                        id='cvtDataExataBirthCertificate'
                        legend='Sei a data exata do nascimento?'
                        onChange={(e) => {
                            setSelectedValue(e.target.value)
                            setValue(name, e.target.value)
                        }}
                    >
                        <RadioButton
                            label='Data exata'
                            value='data'
                            key='data'
                            checked={selectedValue === 'data'}
                        />
                        <RadioButton
                            label='Ano'
                            value='ano'
                            key='ano'
                            checked={selectedValue === 'ano'}
                        />
                    </RadioButtonGroup>
                    <InputNumber
                        id='cvtAnoNascimentoBirthCertificate'
                        label="Ano de nascimento"
                        defaultValue='2025'
                        hasError={errors['cvtAnoNascimentoBirthCertificate'] ? true : false}
                        hasFeedback={true}
                        feedbackState={'danger'}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <InputSelect
                        id='cvtResidencia'
                        value={selectedCountry}
                        defaultValue="PT"
                        type="text"
                        label="País de naturalidade"
                        options={countryOptions}
                        placeholder="Selecione um país"
                        visibleCount={5}
                        searchable
                        hideSectionNames
                        searchInputPlaceholder="Pesquisar país"
                        dropdownAriaLabel="Lista de países"
                        searchNoResultsText="Não foram encontrados resultados."
                        onChange={onChangeCountry}
                    />
                    <TextField
                        id='cvtLocalidade'
                        label="Localidade"
                        placeholder="Indique a localidade"
                        required
                        hasFeedback={true}
                        feedbackState={'danger'}
                        feedbackText={errors['cvtLocalidade']?.message?.toString()}
                        validation={{
                            pattern: {
                                value: /^[\p{L}\d\s'-]+$/u,
                                message: 'Localidade inválida',
                            },
                        }}
                        hasError={errors['cvtLocal'] ? true : false}
                        register={register}
                    />
                </div>
                <TextField
                    id='cvtNomePaiBirthCertificate'
                    label="Nome completo do pai"
                    placeholder="Indique o nome completo do pai"
                    required
                    hasFeedback={true}
                    feedbackState={'danger'}
                    feedbackText={errors['cvtNomePaiBirthCertificate']?.message?.toString()}
                    validation={{
                        pattern: {
                            value: /^[\p{L}\d\s'-]+$/u,
                            message: 'Nome inválido',
                        },
                    }}
                    hasError={errors['cvtNomePaiBirthCertificate'] ? true : false}
                    register={register}
                />
                <TextField
                    id='cvtNomeMaeBirthCertificate'
                    label="Nome completo da mãe"
                    placeholder="Indique o nome completo da mãe"
                    required
                    hasFeedback={true}
                    feedbackState={'danger'}
                    feedbackText={errors['cvtNomeMaeBirthCertificate']?.message?.toString()}
                    validation={{
                        pattern: {
                            value: /^[\p{L}\d\s'-]+$/u,
                            message: 'Nome inválido',
                        },
                    }}
                    hasError={errors['cvtNomeMaeBirthCertificate'] ? true : false}
                    register={register}
                />
                <InputTextArea
                    id='cvtInfoAdicionalBirthCertificate'
                    label="Informação adicional"
                    placeholder="Descreva a informação adicional"
                    hasError={errors['cvtInfoAdicionalBirthCertificate'] ? true : false}
                    {...register('cvtInfoAdicionalBirthCertificate')}
                />
            </div>
        </div>
    )
}
