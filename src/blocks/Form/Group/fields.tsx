import { BirthCertificateData } from '../BirthCertificateData'
import { LocationField } from '../LocationField'
import { Checkbox } from '../Checkbox'
import { FlexRadioButtonGroup } from '../Cidadao/FlexRadioButtonGroup'
import { PriorWeddingChildrenData } from '../Cidadao/PriorWeddingChildrenData'
import { SecondParent } from '../Cidadao/SecondParent'
import { TwinBirthData } from '../Cidadao/TwinBirthData'
import { ContactData } from '../ContactData'
import { Country } from '../Country'
import { CustomMessage } from '../CustomMessage'
import { CustomNumber } from '../CustomNumber'
import { DateOrYearPicker } from '../DateOrYearPicker'
import { Email } from '../Email'
import { Header } from '../Header'
import { IdData } from '../IdData'
import { IdentificationData } from '../IdentificationData'
import { Message } from '../Message'
import { Nationality } from '../Nationality'
import { Nif } from '../Nif'
import { NumberInput } from '../NumberInput'
import { ParentAddress } from '../Address/ParentAddress'
import { ParentIdentification } from '../ParentIdentification'
import { PhoneNumber } from '../PhoneNumber'
import { RadioButtons } from '../RadioButtonGroup'
import { RequestorData } from '../RequestorData'
import { Select } from '../Select'
import { SelectWithApi } from '../SelectWithAPI'
import { State } from '../State'
import { TextArea } from '../TextArea'
import { TextBox } from '../TextBox'
import { Title } from '../Title'
import { CitizenshipCardRequest } from '../Cidadao/CitizenshipCardRequest'
import { AddressData } from '../Address'
import FormSpace from '../FormSpace'
import { DatePicker } from '../DatePicker'
import { RepresentativeCard } from '../RepresentativeCard'
import { WeddingData } from '../WeddingData'

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
  textarea: TextArea,
  nif: Nif,
  selectWithApi: SelectWithApi,
  addressData: AddressData,
  birthCertificateData: BirthCertificateData,
  contactData: ContactData,
  idData: IdData,
  requestorData: RequestorData,
  representativeCard: RepresentativeCard,
  customtext: TextBox,
  nationality: Nationality,
  phoneNumber: PhoneNumber,
  radioButtons: RadioButtons,
  flexRadioButtonGroup: FlexRadioButtonGroup,
  priorWeddingChildrenData: PriorWeddingChildrenData,
  citizenshipCardRequest: CitizenshipCardRequest,
  weddingData: WeddingData,
  twinBirthData: TwinBirthData,
  secondParent: SecondParent,
  dateOrYearPicker: DateOrYearPicker,
  datePicker: DatePicker,
  locationField: LocationField,
  customtextarea: TextArea,
  title: Title,
  formspace: FormSpace,
  parentaddress: ParentAddress,
  identificationData: IdentificationData,
  parentidentification: ParentIdentification,
}
