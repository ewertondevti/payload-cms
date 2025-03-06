import React, { FC, useEffect, useState } from 'react'
import stateConfig, { RelationshipOptions } from './stateConfig'
import { FlexRadioButtonGroup } from '../FlexRadioButtonGroup'
import { AtomicField } from '../types'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'

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

export const SecondParent: FC<UseFormReturn & { errors: FieldErrors<FieldValues> }> = (props) => {
  const [relationship, setRelationship] = useState<RelationshipOptions>()
  const [showPerishedRadioGroup, setShowPerishedRadioGroup] = useState<boolean>(false)
  const [perished, setPerished] = useState<boolean>()
  const [showForeignRegistrationRadioGroup, setShowForeignRegistrationRadioGroup] =
    useState<boolean>(false)
  const [foreignRegistration, setForeignRegistration] = useState<boolean>()
  const [showIdentificationForm, setShowIdentificationForm] = useState<boolean>(false)
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false)

  useEffect(() => {
    setPerished(undefined)
  }, [relationship])

  useEffect(() => {
    setForeignRegistration(undefined)
  }, [relationship, perished])

  useEffect(() => {
    const currentState = stateConfig.get({
      relationship,
      perished,
      foreignRegistration,
    })
    setShowPerishedRadioGroup(!!currentState?.showPerishedRadioGroup)
    setShowForeignRegistrationRadioGroup(!!currentState?.showForeignRegistrationRadioGroup)
    setShowIdentificationForm(!!currentState?.showIdentificationForm)
    setShowAddressForm(!!currentState?.showAddressForm)
    setSubmitEnabled(!!currentState?.submitEnabled)
  }, [relationship, perished, foreignRegistration])

  return (
    <div className="w-[800px] flex flex-col gap-16">
      <FlexRadioButtonGroup
        {...props}
        label="Qual a sua relação com o 2º progenitor?"
        name="relationship"
        alignment="vertical"
        options={relationshipOptions}
        onChange={(value) => setRelationship(value as RelationshipOptions)}
      />
      {showPerishedRadioGroup && (
        <FlexRadioButtonGroup
          {...props}
          label="O segundo progenitor é falecido?"
          name="perished"
          alignment="horizontal"
          options={perishedOptions}
          value={perished !== undefined ? perished.toString() : perished}
          onChange={(value) => setPerished(Boolean(JSON.parse(value)))}
        />
      )}
      {showForeignRegistrationRadioGroup && (
        <FlexRadioButtonGroup
          {...props}
          label="Caso o bebé tenha nascido no estrangeiro, 2º progenitor consta do Registo de nascimento efetuado perante as autoridades locais?"
          name="foreignRegistration"
          alignment="horizontal"
          options={foreignRegistrationOptions}
          value={
            foreignRegistration !== undefined ? foreignRegistration.toString() : foreignRegistration
          }
          onChange={(value) => setForeignRegistration(Boolean(JSON.parse(value)))}
        />
      )}
      {showIdentificationForm && <div>Identification form</div>}
      {showAddressForm && <div>Address form</div>}
    </div>
  )
}
