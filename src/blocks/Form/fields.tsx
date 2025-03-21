import { BirthCertificateData } from './BirthCertificateData'
import { BirthConsultation } from './BirthConsultation'
import { DateOrYearPicker } from './DateOrYearPicker'
import { Location } from './Location'
import { Checkbox } from './Checkbox'
import { ContactData } from './ContactData'
import { Country } from './Country'
import { CustomMessage } from './CustomMessage'
import { CustomNumber } from './CustomNumber'
import { Email } from './Email'
import { Header } from './Header'
import { IdData } from './IdData'
import { IdentificationData } from './IdentificationData'
import { Message } from './Message'
import { Nationality } from './Nationality'
import { Nif } from './Nif'
import { NumberInput } from './NumberInput'
import { PhoneNumber } from './PhoneNumber'
import { PreLoadExample1 } from './PreloadExample1'
import { RadioButtons } from './RadioButtonGroup'
import { RequestorData } from './RequestorData'
import { Select } from './Select'
import { SelectWithApi } from './SelectWithAPI'
import { State } from './State'
import { TextBox } from './TextBox'
import { Textarea } from './Textarea'
import { Title } from './Title'
import { FlexRadioButtonGroup } from './Cidadao/FlexRadioButtonGroup'
import { ParentIdentification } from './ParentIdentification'
import { ParentAddress } from './Address/ParentAddress'
import { SecondParent } from './Cidadao/SecondParent'
import { TwinBirthData } from './Cidadao/TwinBirthData'
import { PriorWeddingChildrenData } from './Cidadao/PriorWeddingChildrenData'
import wrapBlock from './wrapBlock'
import { Group } from './Group'
import { CitizenshipCardRequest } from './Cidadao/CitizenshipCardRequest'
import FormSpace from './FormSpace'
import { AddressData } from './Address'
import { DatePicker } from './DatePicker'

export const fields = {
  customMessage: CustomMessage,
  checkbox: Checkbox,
  customNumber: CustomNumber,
  country: Country,
  email: Email,
  header: Header,
  message: Message,
  number: NumberInput,
  select: Select,
  state: State,
  textBox: TextBox,
  textarea: Textarea,
  nif: Nif,
  formspace: FormSpace,
  selectWithApi: SelectWithApi,
  addressdata: AddressData,
  birthCertificateData: BirthCertificateData,
  contactData: ContactData,
  idData: IdData,
  requestorData: RequestorData,
  customtext: TextBox,
  nationality: Nationality,
  phoneNumber: PhoneNumber,
  radioButtons: RadioButtons,
  flexRadioButtonGroup: FlexRadioButtonGroup,
  priorWeddingChildrenData: PriorWeddingChildrenData,
  citizenshipCardRequest: CitizenshipCardRequest,
  twinBirthData: wrapBlock(TwinBirthData),
  secondParent: SecondParent,
  preLoadExample1: PreLoadExample1,
  dateOrYearPicker: DateOrYearPicker,
  datePicker: DatePicker,
  location: Location,
  customtextarea: Textarea,
  title: Title,
  parentaddress: ParentAddress,
  identificationData: IdentificationData,
  group: Group,
  birthconsultation: BirthConsultation,
  parentidentification: ParentIdentification,
}
