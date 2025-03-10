import React, { FC, useEffect, useState } from 'react'
import stateConfig, { RelationshipOptions, SecondParentStateValue } from './stateConfig'
import { FlexRadioButtonGroup } from '../FlexRadioButtonGroup'
import { AtomicField } from '../types'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { LoadDataCard } from '../LoadDataCard'
import { ParentIdentification, ParentIdentificationProps } from '../../ParentIdentification'
import { ContactData, ContactDataProps } from '../../ContactData'
import { Filiation, FiliationProps } from '../../Filiation'

const relationshipOptions: AtomicField<RelationshipOptions>[] = [
  { label: 'Não conhece o segundo progenitor', value: 'unknown' },
  {
    label: 'Conhece o segundo progenitor, mas não é casado(a) com ele(a)',
    value: 'unmarried',
  },
  { label: 'É casado(a) com o segundo progenitor', value: 'married' },
  {
    label: 'É casado com o segundo progenitor, mas separado de pessoas e bens',
    value: 'separated',
  },
  {
    label: 'É ex-cônjuge do segundo progenitor (divorciado(a), viúvo(a))',
    value: 'divorced',
  },
]

const perishedOptions: AtomicField<'true' | 'false'>[] = [
  { label: 'Sim', value: 'true' },
  { label: 'Não', value: 'false' },
]

const foreignRegistrationOptions: AtomicField<'true' | 'false'>[] = [
  { label: 'Sim', value: 'true' },
  { label: 'Não/Não aplicável', value: 'false' },
]

type SecondParentProps = {
  name: string
  identification: ParentIdentificationProps
  filiation: FiliationProps
  contact: ContactDataProps
}

export const SecondParent: FC<
  SecondParentProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ name, identification, filiation, contact, register, errors, ...rest }) => {
  const [relationship, setRelationship] = useState<RelationshipOptions>()
  const [currentState, setCurrentState] = useState<SecondParentStateValue>({})
  const [perished, setPerished] = useState<boolean>()
  const [foreignRegistration, setForeignRegistration] = useState<boolean>()

  useEffect(() => {
    setPerished(undefined)
  }, [relationship])

  useEffect(() => {
    setForeignRegistration(undefined)
  }, [relationship, perished])

  useEffect(() => {
    setCurrentState(
      stateConfig.get({
        relationship,
        perished,
        foreignRegistration,
      }) ?? {},
    )
  }, [relationship, perished, foreignRegistration])

  return (
    <div className="w-[800px] flex flex-col gap-64">
      <FlexRadioButtonGroup
        {...{ ...rest, register }}
        label="Qual a sua relação com o 2º progenitor?"
        name={`${name}-relationship`}
        alignment="vertical"
        options={relationshipOptions}
        onChange={(value) => setRelationship(value as RelationshipOptions)}
      />
      {currentState.showPerishedRadioGroup && (
        <FlexRadioButtonGroup
          {...{ ...rest, register }}
          label="O segundo progenitor é falecido?"
          name={`${name}-perished`}
          alignment="horizontal"
          options={perishedOptions}
          value={perished !== undefined ? perished.toString() : perished}
          onChange={(value) => setPerished(Boolean(JSON.parse(value)))}
        />
      )}
      {currentState.showForeignRegistrationRadioGroup && (
        <FlexRadioButtonGroup
          {...{ ...rest, register }}
          label="Caso o bebé tenha nascido no estrangeiro, 2º progenitor consta do Registo de nascimento efetuado perante as autoridades locais?"
          name={`${name}-foreignRegistration`}
          alignment="horizontal"
          options={foreignRegistrationOptions}
          value={foreignRegistration !== undefined ? foreignRegistration.toString() : undefined}
          onChange={(value) => setForeignRegistration(Boolean(JSON.parse(value)))}
        />
      )}
      {currentState.showIdentificationForm && (
        <>
          <LoadDataCard />
          <ParentIdentification {...{ ...identification, register, errors }} />
          <Filiation {...{ ...filiation, register, errors }} />
        </>
      )}
      {currentState.showContactForm && <ContactData {...{ ...contact, register, errors }} />}
    </div>
  )
}
