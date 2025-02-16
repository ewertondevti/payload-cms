import { AddressForm } from '../CountryResidency'
import { CountryResidencyBlock } from '../CountryResidency/CountryResidencyBlock'
import { Address } from './Address'
import { Birthdate } from './Birthdate'
import { Birthplace } from './Birthplace'
import { Checkbox } from './Checkbox'
import { Country } from './Country'
import { CustomMessage } from './CustomMessage'
import { CustomNumber } from './CustomNumber'
import { Email } from './Email'
import { IdentificationData } from './IdentificationData'
import { Message } from './Message'
import { Nationality } from './Nationality'
import { Nif } from './Nif'
import { Number } from './Number'
import { PhoneNumber } from './PhoneNumber'
import { PreLoadExample1 } from './PreloadExample1'
import { RadioButtons } from './RadioButtonGroup'
import { Select } from './Select'
import { SelectWithApi } from './SelectWithAPI'
import { State } from './State'
import { Text } from './Text'
import { Textarea } from './Textarea'
import { Title } from './Title'

export const fields = {
  customMessage: CustomMessage,
  checkbox: Checkbox,
  customNumber: CustomNumber,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
  nif: Nif,
  selectWithApi: SelectWithApi,
  customtext: Text,
  address: Address,
  countryresidency: AddressForm,
  nationality: Nationality,
  phoneNumber: PhoneNumber,
  radioButtons: RadioButtons,
  preLoadExample1: PreLoadExample1,
  birthdate: Birthdate,
  birthplace: Birthplace,
  customtextarea: Textarea,
  title: Title,
  identificationData: IdentificationData,
}
