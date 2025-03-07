import { ReadOnlyStateConfig, StateConfig } from '../utilities/StateConfig'

export type RelationshipOptions = 'unknown' | 'unmarried' | 'married' | 'separated' | 'divorced'
type StateKeys = {
  relationship?: RelationshipOptions
  perished?: boolean
  foreignRegistration?: boolean
}
type StateValues = {
  showPerishedRadioGroup?: boolean
  showForeignRegistrationRadioGroup?: boolean
  showIdentificationForm?: boolean
  showAddressForm?: boolean
  submitEnabled?: boolean
}

const stateConfig = StateConfig.from<StateKeys, StateValues>([
  {
    key: { relationship: 'unknown' },
    value: { submitEnabled: true },
  },
  {
    key: { relationship: 'unmarried' },
    value: { showPerishedRadioGroup: true },
  },
  {
    key: { relationship: 'unmarried', perished: true },
    value: {
      showPerishedRadioGroup: true,
      showIdentificationForm: true,
      submitEnabled: true,
    },
  },
  {
    key: { relationship: 'unmarried', perished: false },
    value: {
      showPerishedRadioGroup: true,
      showIdentificationForm: true,
      showAddressForm: true,
      submitEnabled: true,
    },
  },

  { key: { relationship: 'married' }, value: { showPerishedRadioGroup: true } },
  {
    key: { relationship: 'married', perished: true },
    value: { showPerishedRadioGroup: true, showForeignRegistrationRadioGroup: true },
  },
  {
    key: { relationship: 'married', perished: true, foreignRegistration: true },
    value: {
      showPerishedRadioGroup: true,
      showForeignRegistrationRadioGroup: true,
      showIdentificationForm: true,
      submitEnabled: true,
    },
  },
  {
    key: { relationship: 'married', perished: true, foreignRegistration: false },
    value: {
      showPerishedRadioGroup: true,
      showForeignRegistrationRadioGroup: true,
      submitEnabled: true,
    },
  },
  {
    key: { relationship: 'married', perished: false },
    value: {
      showPerishedRadioGroup: true,
      showIdentificationForm: true,
      showAddressForm: true,
      submitEnabled: true,
    },
  },

  { key: { relationship: 'separated' }, value: { showPerishedRadioGroup: true } },
  {
    key: { relationship: 'separated', perished: true },
    value: { showPerishedRadioGroup: true, submitEnabled: true },
  },
  {
    key: { relationship: 'separated', perished: false },
    value: {
      showPerishedRadioGroup: true,
      showIdentificationForm: true,
      showAddressForm: true,
      submitEnabled: true,
    },
  },

  { key: { relationship: 'divorced' }, value: { showPerishedRadioGroup: true } },
  {
    key: { relationship: 'divorced', perished: true },
    value: { showPerishedRadioGroup: true, submitEnabled: true },
  },
  {
    key: { relationship: 'divorced', perished: false },
    value: {
      showPerishedRadioGroup: true,
      showIdentificationForm: true,
      showAddressForm: true,
      submitEnabled: true,
    },
  },
])

export default stateConfig as ReadOnlyStateConfig<StateKeys, StateValues>
